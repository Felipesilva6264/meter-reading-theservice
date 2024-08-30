// src/routes/measureRoutes.ts
import express from 'express';
import { createMeasure, confirmMeasure, listMeasures } from '../controllers/measureController';

const router = express.Router();

// Rota para criar uma nova medida
router.post('/measures', createMeasure);

// Rota para confirmar uma medida existente
router.patch('/measures', confirmMeasure);

// Rota para listar as medidas
router.get('/measures/:customer_code', listMeasures);

export default router;
