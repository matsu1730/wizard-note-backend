# Wizard Note Backend

[![NestJS](https://img.shields.io/badge/NestJS-v11-green.svg)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![TypeORM](https://img.shields.io/badge/TypeORM-PostgreSQL-orange.svg)](https://typeorm.io/)
[![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-yellow.svg)](https://swagger.io/)

Backend do **Wizard Note**, um gerenciador inteligente de notas com IA integrada para sumarização automática de conteúdos.

## 🚀 Sobre o Projeto

O **Wizard Note** é uma aplicação completa para gerenciamento de notas com inteligência artificial. Permite criar notas organizadas por categorias, anexar arquivos e gerar resumos automáticos via IA.

**Funcionalidades principais:**
- Cadastro e autenticação JWT de usuários
- Criação de categorias com cores personalizadas
- Notas com resumo automático por IA
- Upload de arquivos em base64
- Documentação automática via Swagger

## 🏗️ Domínios da Aplicação

| Domínio | Descrição |
|---------|-----------|
| **Usuario** | Gerenciamento completo de usuários com autenticação JWT e hash bcrypt |
| **Categoria** | Organização de notas por categorias com nome, descrição e cor personalizada |
| **Nota** | Criação e edição de notas com título, conteúdo, resumo IA e palavras-chave |
| **NotaArquivo** | Upload e gerenciamento de arquivos associados às notas (base64 → Buffer) |

## 📋 Pré-requisitos

- **Node.js** v18+ ou superior
- **npm** v9+ ou **yarn**
- **PostgreSQL** (configurar via variáveis de ambiente)
- **Git** para versionamento

## 🚀 Setup Rápido

### 1. Clonar o repositório
```
git clone https://github.com/SEU_USUARIO/wizard-note-backend.git
cd wizard-note-backend
```

### 2. Instalar dependências
```
npm install
```

### 3. Configurar variáveis de ambiente
Crie o arquivo `.env` na raiz do projeto:

```
DB_HOST=localhost
DB_NAME=wizard_note
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_PORT=5432
HUGGING_FACE_API_KEY=sua_key
HUGGING_FACE_API_URL=https://router.huggingface.co/hf-inference
JWT_ISSUER=https://www.wizard-note.com
JWT_SECRET=seu_secret
```

### 4. Configurar banco de dados
Criar database PostgreSQL: wizard_note
Executar migrations (se houver)
npm run typeorm:migration:run

### 5. Rodar em modo desenvolvimento
npm run start:dev

A aplicação estará disponível em: 👉 [**http://localhost:3000**](http://localhost:3000)

## 📖 Documentação da API

Acesse **Swagger UI** automaticamente em: 👉
[**http://localhost:3000/api**](http://localhost:3000/api)

## 🛠️ Scripts Disponíveis
```
npm run start # Produção
npm run start:dev # Desenvolvimento (hot reload)
npm run start:debug # Debug mode
npm run build # Build para produção
npm run lint # Lint TypeScript
npm run test # Executar testes
npm run test:watch # Testes em watch mode
npm run test:cov # Testes com coverage
```

## 🏗️ Estrutura do Projeto
src/
├── auth/ # Autenticação JWT, Guards
├── usuario/ # CRUD Usuários
├── categoria/ # CRUD Categorias
├── nota/ # CRUD Notas + IA
├── nota-arquivo/ # Upload arquivos
├── utils/ # DTOs
└── config/ # Configuração de ambiente e ORM

## 🔗 Tecnologias Utilizadas

- **NestJS v11** - Framework backend
- **TypeORM** - ORM com PostgreSQL
- **TypeScript** - Tipagem estrita
- **JWT + bcrypt** - Autenticação segura
- **Swagger/OpenAPI** - Documentação automática
- **class-validator** - Validação DTOs
- **class-transformer** - Transformação objetos

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch `feat/nova-funcionalidade`
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

---

**Feito com ❤️ para desenvolvedores que querem notas inteligentes!**

---

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>