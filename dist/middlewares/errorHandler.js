"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Middleware de tratamento de erros
const errorHandler = (err, req, res, next) => {
    // Define o status HTTP padrão para 500 (Internal Server Error)
    const statusCode = err.status || 500;
    // Define a mensagem de erro padrão
    const message = err.message || 'Internal Server Error';
    // Log do erro para depuração
    console.error(err);
    // Envia a resposta para o cliente
    res.status(statusCode).json({
        status: statusCode,
        message: message,
    });
};
exports.default = errorHandler;
