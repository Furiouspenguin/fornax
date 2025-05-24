import { DeviceStatus } from "./device.model"

export interface DeviceStatusChart {
    labels: string[],
    datasets: DeviceStatusChartDataset[]
}

export interface DeviceStatusChartDataset {
    label: DeviceStatus,
    data: number[],
    fill: boolean,
    borderColor: string,
    tension: number
}
