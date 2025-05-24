import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button'
import { TableModule } from 'primeng/table'
import { Device } from '../../models/device.model';
import { DeviceService } from '../../services/device.service';


@Component({
  selector: 'app-devices',
  imports: [ButtonModule, TableModule],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.scss',
})
export class DevicesComponent implements OnInit, OnDestroy {
  devices: Device[] = [];
  interval ?: NodeJS.Timeout = undefined

  constructor(private deviceService: DeviceService) {}
  
  ngOnInit(): void {
    this.getDevicesData()
    this.interval = setInterval(this.getDevicesData, 3000)
  }

  getDevicesData = () => {
    this.deviceService.listDevices().subscribe({
      next: (data) => {
        this.devices = data;
      },
    });
  }

  ngOnDestroy(): void {
    if (this.interval) clearInterval(this.interval)
  }
}
