import { model, Schema } from "mongoose";
import { Device } from "../models/device.model";

const deviceSchema = new Schema<Device>({
    name: {type: String, required: true},
    type: {type: String, required: true},
    ip: {type: String, required: true},
    status: {type: String, enum: ['active', 'error', 'inactive'], default: 'active', required: true},
    location: {type: String, required: true},
});

export const DeviceRepository = model<Device>('Device', deviceSchema, 'devices');