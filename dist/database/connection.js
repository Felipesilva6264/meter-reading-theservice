"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
// Obter variáveis de ambiente com valores padrão
const dbHost = process.env.DB_HOST || 'db';
const dbPort = parseInt(process.env.DB_PORT || '5432', 10);
const dbName = process.env.DB_NAME || 'yourdatabase';
const dbUser = process.env.DB_USER || 'FelipeSilva';
const dbPassword = process.env.DB_PASSWORD || 'FFbs@@2024';
// Configurar a conexão com o banco de dados
const sequelize = new sequelize_1.Sequelize({
    dialect: 'postgres',
    host: dbHost,
    port: dbPort,
    database: dbName,
    username: dbUser,
    password: dbPassword,
    logging: false,
});
exports.sequelize = sequelize;
// Verificar a conexão
sequelize.authenticate()
    .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
})
    .catch((error) => {
    console.error('Não foi possível conectar ao banco de dados:', error.message);
});
