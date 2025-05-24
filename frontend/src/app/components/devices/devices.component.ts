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
    this.interval = setInterval(this.getDevicesData, 4000)
  }

  getDevicesData = () => {
    this.deviceService.listDevices().subscribe({
      next: (data) => {
        this.devices = data;
      },
    });
  }

  deleteDevice(id: number) {
    console.log('attempting to delete device', id)
    this.deviceService.removeDevice(id).subscribe({
      next: (data) => {
        console.log(`Device deleted. (id: ${data.id})`)
        if (data.id !== id) console.warn('Deleted device\'s id doesn\'t match!');
        const removedIndex = this.devices.findIndex((d) => d.id === id)
        this.devices.splice(removedIndex, 1)
      }
    })
  }

  ngOnDestroy(): void {
    if (this.interval) clearInterval(this.interval)
  }
}
