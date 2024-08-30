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
exports.measureService = void 0;
const measureModel_1 = require("../models/measureModel");
const sequelize_1 = require("sequelize");
const geminiService_1 = require("./geminiService");
exports.measureService = {
    // Método para criar uma nova leitura
    createMeasure(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { image, customer_code, measure_datetime, measure_type } = params;
            // Verifica se já existe uma leitura no mês atual para o tipo de medida
            const existingMeasure = yield measureModel_1.MeasureModel.findOne({
                where: {
                    customer_code,
                    measure_type,
                    measure_datetime: {
                        [sequelize_1.Op.between]: [
                            new Date(measure_datetime.getFullYear(), measure_datetime.getMonth(), 1),
                            new Date(measure_datetime.getFullYear(), measure_datetime.getMonth() + 1, 0),
                        ],
                    },
                },
            });
            if (existingMeasure) {
                throw { code: 'DOUBLE_REPORT', message: 'Leitura do mês já realizada' };
            }
            // Chama o serviço Gemini para processar a imagem e obter a leitura
            const geminiResult = yield geminiService_1.GeminiService.processImage(image);
            // Cria e salva a nova medida no banco de dados
            yield measureModel_1.MeasureModel.create({
                customer_code,
                measure_datetime,
                measure_type,
                image_url: geminiResult.image_url,
                measure_value: geminiResult.measure_value,
                measure_uuid: geminiResult.measure_uuid,
            });
            return geminiResult;
        });
    },
    // Método para confirmar ou corrigir uma leitura existente
    confirmMeasure(measure_uuid, confirmed_value) {
        return __awaiter(this, void 0, void 0, function* () {
            const measure = yield measureModel_1.MeasureModel.findOne({ where: { measure_uuid } });
            if (!measure) {
                throw { code: 'MEASURE_NOT_FOUND', message: 'Leitura não encontrada' };
            }
            if (measure.has_confirmed) {
                throw { code: 'CONFIRMATION_DUPLICATE', message: 'Leitura já confirmada' };
            }
            // Atualiza a leitura com o valor confirmado e marca como confirmada
            measure.measure_value = confirmed_value;
            measure.has_confirmed = true;
            yield measure.save();
        });
    },
    // Método para listar as leituras realizadas por um cliente
    listMeasures(customer_code, measure_type) {
        return __awaiter(this, void 0, void 0, function* () {
            const whereClause = { customer_code };
            if (measure_type) {
                whereClause.measure_type = measure_type.toUpperCase();
            }
            const measures = yield measureModel_1.MeasureModel.findAll({ where: whereClause });
            if (measures.length === 0) {
                throw { code: 'MEASURES_NOT_FOUND', message: 'Nenhuma leitura encontrada' };
            }
            return measures.map(measure => measure.get({ plain: true }));
        });
    },
};
