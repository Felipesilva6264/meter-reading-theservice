import express from 'express';
import { json } from 'body-parser';
import { sequelize } from './src/database/connection';
import router from './src/routes/measureRoutes';
import { GEMINI_API_KEY } from './src/config/env';

const app = express();

// Middleware
app.use(json());

// Configuração das rotas
app.use('/api', router);

// Inicialização do banco de dados e do servidor
const startServer = async () => {
  try {
    // Sincroniza o modelo com o banco de dados
    await sequelize.sync();
    console.log('Banco de dados sincronizado.');

    // Verifica se a chave da API do Gemini está configurada
    if (!GEMINI_API_KEY) {
      throw new Error('A chave da API do Gemini não está configurada.');
    }

    // Inicia o servidor
    app.listen(3000, () => {
      console.log('Servidor iniciado na porta 3000.');
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro ao iniciar o servidor:', error.message);
    } else {
      console.error('Erro ao iniciar o servidor:', error);
    }
    process.exit(1);
  }
};

startServer();
