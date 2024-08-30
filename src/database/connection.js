"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
// src/database/connection.ts
const sequelize_1 = require("sequelize");
// Configure a conexão com o banco de dados
const sequelize = new sequelize_1.Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'nome_do_banco_de_dados',
    username: 'seu_usuario',
    password: 'sua_senha',
    logging: false, // Defina como true se quiser ver logs SQL
});
exports.sequelize = sequelize;
// Verifique a conexão
sequelize.authenticate()
    .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
})
    .catch((error) => {
    console.error('Não foi possível conectar ao banco de dados:', error.message);
});
