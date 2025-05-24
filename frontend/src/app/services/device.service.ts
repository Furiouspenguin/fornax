import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '../models/device.model';
import { DeviceInput } from '../models/device-input.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { DeviceStatusChart } from '../models/device-status-chart.model';



@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  //private URL_PATH = (process.env["URL_PATH"] || 'http://localhost:') + (process.env["BACKEND_PORT"] || '3000') + '/devices';
  private URL_PATH = 'http://localhost:3000/devices'
  private _devices$ = new BehaviorSubject<Device[]>([]);

  private _deviceStatusData$ = new BehaviorSubject<DeviceStatusChart>(this.initDeviceStatusData());

  constructor(private http: HttpClient) {
    this._devices$.subscribe({
      next: (data) => {
        this.evaluateDeviceData(data);
      }
    })
  }

  //HTTP calls
  listDevices() {
    return this.http.get<Device[]>(this.URL_PATH);
  }

  postDevice(deviceInput: DeviceInput) {
    return this.http.post<Device>(this.URL_PATH, deviceInput);
  }

  removeDevice(id: number) {
    return this.http.delete<Device>(`${this.URL_PATH}/${id}`);
  }


  //device logic
  getDevices$(): Observable<Device[]> {
    return this._devices$.asObservable();
  }

  getDevicesData = () => {
    this.listDevices().subscribe({
      next: (data) => {
        this._devices$.next(data);
      },
    });
  }

  deleteDevice(id: number) {
    console.log('attempting to delete device', id);
    this.removeDevice(id).subscribe({
      next: (data) => {
        console.log(`Device deleted. (id: ${data.id})`);
        if (data.id !== id) console.warn('Deleted device\'s id doesn\'t match!');
        const currentDevices = this._devices$.getValue();
        const removedIndex = currentDevices.findIndex((d) => d.id === id);
        currentDevices.splice(removedIndex, 1);
        this._devices$.next(currentDevices);
      }
    })
  }

  addDevice(device: Device) {
    const currentDevices = this._devices$.getValue();
    const index = currentDevices.findIndex(d => d.id === device.id);
    if (index < 1) {
      currentDevices.push(device);
      this._devices$.next(currentDevices);
    }
  }

  //chart data logic
  initDeviceStatusData(): DeviceStatusChart {
    return { 
      labels:[], 
      datasets: [
        {
          label: 'active',
          data: [],
          fill: false,
          borderColor: '#00FFFF',
          tension: 0.4
        },
        {
          label: 'error',
          data: [],
          fill: false,
          borderColor: '#808080',
          tension: 0.4
        },
        {
          label: 'inactive',
          data: [],
          fill: false,
          borderColor: '#FFD900',
          tension: 0.4
        }
      ] 
    }
  }

  evaluateDeviceData(devices: Device[]) {
    let countActive = 0
    let countError = 0
    let countInactive = 0
    devices.forEach(d => {
      switch(d.status) {
        case 'active':
          countActive++;
          break;
        case 'error':
          countError++;
          break;
        case 'inactive':
          countInactive++;
          break;
      }
    });

    if (countActive > 0 || countError > 0 || countInactive > 0) {
      const date = new Date(Date.now());
      const dateString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      const currentDeviceStatusData = this._deviceStatusData$.getValue();
      if (currentDeviceStatusData.labels.length >= 10) {
        currentDeviceStatusData.labels.shift();
        currentDeviceStatusData.datasets[0].data.shift();
        currentDeviceStatusData.datasets[1].data.shift();
        currentDeviceStatusData.datasets[2].data.shift();
      }
      currentDeviceStatusData.labels.push(dateString);
      currentDeviceStatusData.datasets[0].data.push(countActive);
      currentDeviceStatusData.datasets[1].data.push(countError);
      currentDeviceStatusData.datasets[2].data.push(countInactive);
      
      this._deviceStatusData$.next({...currentDeviceStatusData});
    }
  }

  getDeviceStatusData$(): Observable<DeviceStatusChart> {
    return this._deviceStatusData$.asObservable();
  }
}
