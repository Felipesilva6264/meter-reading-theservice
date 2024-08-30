"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/measureRoutes.ts
const express_1 = __importDefault(require("express"));
const measureController_1 = require("../controllers/measureController");
const router = express_1.default.Router();
// Rota para criar uma nova medida
router.post('/measures', measureController_1.createMeasure);
// Rota para confirmar uma medida existente
router.patch('/measures', measureController_1.confirmMeasure);
// Rota para listar as medidas
router.get('/measures/:customer_code', measureController_1.listMeasures);
exports.default = router;
