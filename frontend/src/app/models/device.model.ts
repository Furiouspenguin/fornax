export type DeviceStatus = 'active' | 'error' | 'inactive';

export interface Device {
    _id: string;
    name: string;
    type: string;
    ip: string;
    status: DeviceStatus;
    location: string;
}