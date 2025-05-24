import { Component, OnInit } from '@angular/core';
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
export class DevicesComponent implements OnInit {
  devices: Device[] = [];

  constructor(private deviceService: DeviceService) {}
  
  ngOnInit(): void {
    this.deviceService.listDevices().subscribe({
      next: (data) => {
        this.devices = data;
      }
    });
  }
}
