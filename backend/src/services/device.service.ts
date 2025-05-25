import { Types } from "mongoose";
import devicesData from "../data/database";
import { DeviceRepository } from "../data/device.schema";
import { getRandomInt } from "../lib/utils";
import { DeviceInput } from "../models/device-input.model";
import { Device, DeviceStatus } from "../models/device.model";

export async function listAllDevices(): Promise<Device[]> {
    //find the devices
    const devices = await DeviceRepository.find({}).select('-__v -id');
    //update their status
    const statuses: DeviceStatus[] = ['active', 'error', 'inactive'];
    for (const device of devices) {
        //get a new random status
        const randomStatus = statuses[getRandomInt(3)];
        device.status = randomStatus;
        //make sure to save the changes
        await device.save();
    }
    return devices;
}

export async function addNewDevice(deviceInput: DeviceInput): Promise<Device> {
    const newDevice = await DeviceRepository.create({...deviceInput});
    return newDevice.toObject({versionKey: false});
}

export async function deleteDevice(id: Types.ObjectId): Promise<Device> {
    const deleteDevice = await DeviceRepository.findByIdAndDelete(id).select('-__v -id');
    if (deleteDevice) {
        return deleteDevice?.toObject();
    } else throw new Error('Invalid ID!');
}