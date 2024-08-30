# Serviço de Leitura de Imagens

Este projeto é um serviço backend para gerenciar a leitura de medidores de água e gás a partir de imagens, utilizando a API do Google Gemini para extração de dados.

## Estrutura do Projeto

- **`src`**: Código-fonte da aplicação.
  - **`controllers`**: Controladores para manipular as requisições.
  - **`models`**: Modelos do banco de dados.
  - **`services`**: Serviços externos e integrações.
  - **`routes.ts`**: Definição das rotas da API.
  - **`app.ts`**: Configuração do servidor Express e inicialização da aplicação.

- **`Dockerfile`**: Arquivo para construir a imagem Docker da aplicação.
- **`docker-compose.yml`**: Configuração dos serviços Docker, incluindo a aplicação e o banco de dados.
- **`package.json`**: Gerenciamento de dependências e scripts.
- **`tsconfig.json`**: Configuração do TypeScript.

## Configuração

1. **Clone o repositório:**

   ```bash
   git clone <url-do-repositorio>
   cd <nome-do-repositorio>
