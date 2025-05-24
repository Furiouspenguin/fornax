import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '../models/device.model';
import { DeviceInput } from '../models/device-input.model';



@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  //private URL_PATH = (process.env["URL_PATH"] || 'http://localhost:') + (process.env["BACKEND_PORT"] || '3000') + '/devices';
  private URL_PATH = 'http://localhost:3000/devices'

  constructor(private http: HttpClient) { }

  listDevices() {
    return this.http.get<Device[]>(this.URL_PATH);
  }

  addDevice(deviceInput: DeviceInput) {
    return this.http.post<Device>(this.URL_PATH, deviceInput);
  }

  removeDevice(id: number) {
    return this.http.delete<Device>(`${this.URL_PATH}/${id}`);
  }
}
