// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

// Tipo para erros personalizados
interface Error {
  status?: number;
  message?: string;
}

// Middleware de tratamento de erros
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
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

export default errorHandler;
