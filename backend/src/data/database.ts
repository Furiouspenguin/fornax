import {Device} from '../models/device.model'

let devicesData: Device[] = [];

export default devicesData;

export function updateDevicesData(newData: Device[]) {
    devicesData = newData;
}