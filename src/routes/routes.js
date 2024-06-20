import express from 'express';
import apiController from '../controllers/apiControllers.js';
import { apiConfig } from '../config/config.js';

const router = express.Router();

// router.post('/upload', apiController.convertCsvToJson);
// router.post('/api2', apiController.api2);

Object.entries(apiConfig.endpoints).forEach(([endpointName, { path, method }]) => {
    router[method](path, apiController[endpointName]);
});// apiController must have the function with the name of endpont

export default router;
