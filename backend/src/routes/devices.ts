import { Router } from "express";
import { addNewDevice, deleteDevice, listAllDevices } from "../services/device.service";
import { DeviceInput } from "../models/device-input.model";

const devicesRouter = Router();

//GET all devices
devicesRouter.get('/', (req,res) => {
    res.json(listAllDevices())
})

//POST new device
devicesRouter.post<DeviceInput>('/', (req,res) => {
    //TODO - type validation
    res.json(addNewDevice(req.body))
})

//DELETE device by id
devicesRouter.delete('/:id', (req,res) => {
    const id = Number(req.params.id)
    //TODO - type validation and error handling
    if (isNaN(id)) {
        console.error(new Error('Not a valid id!'))
        res.status(400).send('Not a valid id!');
    } else {
        try {
            console.log(id)
            res.json(deleteDevice(id))
        } catch (error) {
            console.error(error);
            res.status(400).send('Bad ID!');
        }
    }
})

export default devicesRouter;