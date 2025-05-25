import { Router } from "express";
import { addNewDevice, deleteDevice, listAllDevices } from "../services/device.service";
import { DeviceInput } from "../models/device-input.model";
import { body, param, validationResult } from "express-validator";
import { Types } from "mongoose";

const devicesRouter = Router();

//GET all devices
devicesRouter.get('/', async (req,res) => {
    res.json(await listAllDevices());
})

//POST new device
devicesRouter.post<DeviceInput>('/', 
    body('name').isString(), body('type').isString(), body('ip').isString(), body('location').isString(), 
    async (req,res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            res.json(await addNewDevice(req.body));
        } else {
            res.status(400).json({errors: errors.array()});
        }
    }
)

//DELETE device by id
devicesRouter.delete('/:id', param('id').isString(), async (req,res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const id = String(req.params?.id)
        try {
            res.json(await deleteDevice(new Types.ObjectId(id)))
        } catch (error) {
            console.error(error);
            res.status(400).send('Bad ID!');
        }
    } else {
        console.error(new Error('Invalid ID!'))
        res.status(400).send('Invalid ID!');
    } 
})

export default devicesRouter;