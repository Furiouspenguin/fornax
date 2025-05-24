import { Router } from "express";
import { addNewDevice, deleteDevice, listAllDevices } from "../services/device.service";
import { DeviceInput } from "../models/device-input.model";
import { body, param, validationResult } from "express-validator";

const devicesRouter = Router();

//GET all devices
devicesRouter.get('/', (req,res) => {
    res.json(listAllDevices())
})

//POST new device
devicesRouter.post<DeviceInput>('/', 
    body('name').isString(), body('type').isString(), body('ip').isString(), body('location').isString(), 
    body('status').custom(status => { 
        if (!(status === 'active' || status === 'error' || status === 'inactive')) {
            throw new Error('Bad Status!'); 
        }
        return status
    }), 
    (req,res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            res.json(addNewDevice(req.body))
        } else {
            res.status(400).json({errors: errors.array()});
        }
    }
)

//DELETE device by id
devicesRouter.delete('/:id', param('id').isNumeric(),(req,res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const id = Number(req.params?.id)
        try {
            console.log(id)
            res.json(deleteDevice(id))
        } catch (error) {
            console.error(error);
            res.status(400).send('Bad ID!');
        }
    } else {
        console.error(new Error('Not a valid id!'))
        res.status(400).send('Not a valid id!');
    } 
})

export default devicesRouter;