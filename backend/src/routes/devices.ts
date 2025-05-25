import { Router } from "express";
import { addNewDevice, deleteDevice, listAllDevices } from "../services/device.service";
import { DeviceInput } from "../models/device-input.model";
import { body, param, validationResult } from "express-validator";
import { Types } from "mongoose";

const devicesRouter = Router();

//GET all devices
devicesRouter.get('/', async (req, res, next) => {
    try {
        res.json(await listAllDevices());
    } catch (error) {
        next(error);
    }
})

//POST new device
devicesRouter.post<DeviceInput>('/', 
    body('name').isString(), body('type').isString(), body('ip').isString(), body('location').isString(), 
    async (req,res, next) => {
        try {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                res.json(await addNewDevice(req.body));
            } else {
                res.status(400).json({errors: errors.array()});
            }
        } catch (error) {
            next(error)
        }
    }
)

//DELETE device by id
devicesRouter.delete('/:id', param('id').isString(), async (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (errors.isEmpty()) {
            const id = String(req.params?.id);
            res.json(await deleteDevice(new Types.ObjectId(id)))
            
        } else {
            throw new Error('Invalid ID!')
        } 
    } catch (error) {
        next(error);
    }
})

export default devicesRouter;