import devicesData from "../data/database";
import { DeviceInput } from "../models/device-input.model";
import { Device } from "../models/device.model";

export function listAllDevices(): Device[] {
    return devicesData;
}

export function addNewDevice(deviceInput: DeviceInput): Device {
    //get a new ID
    const newId = devicesData.length > 0 ? (devicesData[devicesData.length -1].id + 1) : 0;
    //create new Device and add it to the database
    const newDevice: Device = { id: newId, ...deviceInput }
    const newLength = devicesData.push(newDevice);
    //return the new Device
    return devicesData[newLength - 1];
}

export function deleteDevice(id: number): Device {
    //find the specified Device by its ID
    const deviceIndex = devicesData.findIndex((d) => d.id === id)
    if (deviceIndex < 0) throw new Error('Bad ID!');
    //if found, return the deleted Device's data
    return devicesData.splice(deviceIndex, 1)[0];
}