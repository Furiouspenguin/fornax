export type DeviceStatus = 'active' | 'error' | 'inactive';

export interface Device {
    id: number;
    name: string;
    type: string;
    ip: string;
    status: DeviceStatus;
    location: string;
}