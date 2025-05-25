import { Types } from "mongoose";

export type DeviceStatus = 'active' | 'error' | 'inactive';

export interface Device {
    _id: Types.ObjectId;
    name: string;
    type: string;
    ip: string;
    status: DeviceStatus;
    location: string;
}