"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listMeasures = exports.confirmMeasure = exports.createMeasure = void 0;
const measureService_1 = require("../services/measureService");
// Função para criar uma nova medida
const createMeasure = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { image, customer_code, measure_datetime, measure_type } = req.body;
        // Validação dos campos obrigatórios
        if (typeof image !== 'string' || typeof customer_code !== 'string' ||
            !(typeof measure_datetime === 'string' && !isNaN(Date.parse(measure_datetime))) ||
            (measure_type !== 'WATER' && measure_type !== 'GAS')) {
            return res.status(400).json({
                error_code: 'INVALID_INPUT',
                error_description: 'Dados de entrada inválidos ou ausentes.',
            });
        }
        // Conversão do campo measure_datetime para Date
        const formattedDate = new Date(measure_datetime);
        // Chama o serviço para criar uma nova leitura
        const result = yield measureService_1.measureService.createMeasure({
            image,
            customer_code,
            measure_datetime: formattedDate,
            measure_type: measure_type,
        });
        return res.status(200).json(result);
    }
    catch (error) {
        // Garantir que error seja do tipo Error
        if (error instanceof Error) {
            return res.status(400).json({
                error_code: 'UNKNOWN_ERROR',
                error_description: error.message,
            });
        }
        else {
            return res.status(400).json({
                error_code: 'UNKNOWN_ERROR',
                error_description: 'Ocorreu um erro desconhecido.',
            });
        }
    }
});
exports.createMeasure = createMeasure;
// Função para confirmar uma medida existente
const confirmMeasure = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { measure_uuid, confirmed_value } = req.body;
        // Validação dos campos obrigatórios
        if (typeof measure_uuid !== 'string' || typeof confirmed_value !== 'number') {
            return res.status(400).json({
                error_code: 'INVALID_INPUT',
                error_description: 'Dados de entrada inválidos ou ausentes.',
            });
        }
        // Chama o serviço para confirmar ou corrigir a leitura
        yield measureService_1.measureService.confirmMeasure(measure_uuid, confirmed_value);
        return res.status(200).json({ success: true });
    }
    catch (error) {
        // Garantir que error seja do tipo Error
        if (error instanceof Error) {
            return res.status(400).json({
                error_code: 'UNKNOWN_ERROR',
                error_description: error.message,
            });
        }
        else {
            return res.status(400).json({
                error_code: 'UNKNOWN_ERROR',
                error_description: 'Ocorreu um erro desconhecido.',
            });
        }
    }
});
exports.confirmMeasure = confirmMeasure;
// Função para listar medidas com base no código do cliente
const listMeasures = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customer_code } = req.params;
        const { measure_type } = req.query;
        // Validação dos parâmetros
        if (typeof customer_code !== 'string' || (measure_type && typeof measure_type !== 'string')) {
            return res.status(400).json({
                error_code: 'INVALID_INPUT',
                error_description: 'Dados de entrada inválidos ou ausentes.',
            });
        }
        // Chama o serviço para listar as medidas
        const measures = yield measureService_1.measureService.listMeasures(customer_code, measure_type);
        return res.status(200).json({ customer_code, measures });
    }
    catch (error) {
        // Garantir que error seja do tipo Error
        if (error instanceof Error) {
            return res.status(404).json({
                error_code: 'MEASURES_NOT_FOUND',
                error_description: error.message,
            });
        }
        else {
            return res.status(404).json({
                error_code: 'MEASURES_NOT_FOUND',
                error_description: 'Ocorreu um erro desconhecido.',
            });
        }
    }
});
exports.listMeasures = listMeasures;
