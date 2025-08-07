import express from 'express';
import { procesarSoap, procesarSoapDebug } from '../controllers/soap.controller.js';

const router = express.Router();

router.post('/soap', procesarSoapDebug);

export default router;
