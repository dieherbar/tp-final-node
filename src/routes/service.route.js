import express from 'express';
import { obtenerRespuesta } from '../controllers/service.controller.js';

const router = express.Router();

router.get('/servicio', obtenerRespuesta);

export default router;
