import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '../models/device.model';



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
}
