import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button'
import { TableModule } from 'primeng/table'
import { ChartModule } from 'primeng/chart';
import { Device } from '../../models/device.model';
import { DeviceService } from '../../services/device.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-devices',
  imports: [ButtonModule, TableModule, ChartModule, CommonModule],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.scss',
})
export class DevicesComponent implements OnInit, OnDestroy {
  
  devices: Device[] = [];
  interval ?: NodeJS.Timeout = undefined
  options: any

  constructor(protected deviceService: DeviceService) {
    this.initChartOptions();
  }
  
  initChartOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');
    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          y: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          }
      }
  };
  }

  
  
  ngOnInit(): void {
    this.deviceService.getDevicesData()
    this.interval = setInterval(this.deviceService.getDevicesData, 4000)
  }


  deleteDevice(id: number) {
    this.deviceService.deleteDevice(id);
  }

  ngOnDestroy(): void {
    if (this.interval) clearInterval(this.interval)
  }
}
