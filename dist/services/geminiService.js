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
exports.GeminiService = void 0;
exports.GeminiService = {
    // Método para processar a imagem e obter a leitura simulada
    processImage(image) {
        return __awaiter(this, void 0, void 0, function* () {
            // Simulação do processamento de imagem
            return {
                measure_uuid: '123e4567-e89b-12d3-a456-426614174000',
                image_url: 'http://example.com/image.jpg',
                measure_value: Math.floor(Math.random() * 1000), // Valor simulado da leitura
            };
        });
    },
};
