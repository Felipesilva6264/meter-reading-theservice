import dotenv from 'dotenv';
import path from 'path';

// Carrega o arquivo .env na raiz do projeto
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Exporta as variáveis de ambiente para uso na aplicação
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
export const PORT = process.env.PORT || 3000;
export const DATABASE_URL = process.env.DATABASE_URL || 'sqlite://:memory:';

if (!GEMINI_API_KEY) {
  throw new Error('A chave da API do Google Gemini (GEMINI_API_KEY) é obrigatória.');
}
