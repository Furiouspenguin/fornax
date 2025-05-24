import { DeviceStatus } from "./device.model";

export interface DeviceHistory {
    id: number;
    statusLog: DeviceStatus[];
}