"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_URL = exports.PORT = exports.GEMINI_API_KEY = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Carrega o arquivo .env na raiz do projeto
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
// Exporta as variáveis de ambiente para uso na aplicação
exports.GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
exports.PORT = process.env.PORT || 3000;
exports.DATABASE_URL = process.env.DATABASE_URL || 'sqlite://:memory:';
if (!exports.GEMINI_API_KEY) {
    throw new Error('A chave da API do Google Gemini (GEMINI_API_KEY) é obrigatória.');
}
