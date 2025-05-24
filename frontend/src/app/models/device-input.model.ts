import { DeviceStatus } from "./device.model";

export interface DeviceInput {
    name: string;
    type: string;
    ip: string;
    status: DeviceStatus;
    location: string;
}