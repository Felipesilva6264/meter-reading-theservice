import { Sequelize } from 'sequelize';

// Obter variáveis de ambiente com valores padrão
const dbHost = process.env.DB_HOST || 'db';
const dbPort = parseInt(process.env.DB_PORT || '5432', 10);
const dbName = process.env.DB_NAME || 'yourdatabase';
const dbUser = process.env.DB_USER || 'FelipeSilva';
const dbPassword = process.env.DB_PASSWORD || 'FFbs@@2024';

// Configurar a conexão com o banco de dados
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: dbHost,
  port: dbPort,
  database: dbName,
  username: dbUser,
  password: dbPassword,
  logging: false,
});

// Verificar a conexão
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch((error: Error) => {
    console.error('Não foi possível conectar ao banco de dados:', error.message);
  });

export { sequelize };
