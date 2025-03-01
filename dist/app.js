"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const measureRoutes_1 = __importDefault(require("./routes/measureRoutes"));
const dotenv = __importStar(require("dotenv"));
const sequelize_1 = require("sequelize");
dotenv.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, body_parser_1.json)());
// Configuração das rotas
app.use('/api', measureRoutes_1.default);
// Inicialização do banco de dados e do servidor
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Configuração do Sequelize
        const sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL, {
            dialect: 'postgres',
            logging: false,
        });
        // Sincroniza o modelo com o banco de dados
        yield sequelize.sync();
        console.log('Banco de dados sincronizado.');
        // Verifica se a chave da API do Gemini está configurada
        if (!process.env.GEMINI_API_KEY) {
            throw new Error('A chave da API do Gemini não está configurada.');
        }
        // Inicia o servidor
        app.listen(3000, () => {
            console.log('Servidor iniciado na porta 3000.');
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Erro ao iniciar o servidor:', error.message);
        }
        else {
            console.error('Erro ao iniciar o servidor:', error);
        }
        process.exit(1);
    }
});
startServer();
