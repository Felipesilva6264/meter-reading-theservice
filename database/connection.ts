// src/database/connection.ts
import { Sequelize } from 'sequelize';

// Configure a conexão com o banco de dados
const sequelize = new Sequelize({
  dialect: 'postgres', // ou o banco de dados que você está usando (mysql, sqlite, etc.)
  host: 'localhost',
  port: 5432, // substitua pela porta do seu banco de dados
  database: 'nome_do_banco_de_dados',
  username: 'seu_usuario',
  password: 'sua_senha',
  logging: false, // Defina como true se quiser ver logs SQL
});

// Verifique a conexão
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch((error: Error) => {
    console.error('Não foi possível conectar ao banco de dados:', error.message);
  });

export { sequelize };
