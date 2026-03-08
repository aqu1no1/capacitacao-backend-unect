# 🚀 Capacitação Backend - NestJS (UNECT)

Este projeto faz parte da **capacitação backend da UNECT**, com o objetivo de desenvolver uma **API RESTful de Blog** utilizando **NestJS**, **TypeORM** e **PostgreSQL**.

A aplicação permite **gerenciamento de usuários, autenticação com JWT, criação de posts e comentários**, seguindo boas práticas de arquitetura backend.

---

# 🧰 Tecnologias Utilizadas

* **Node.js**
* **NestJS**
* **TypeScript**
* **PostgreSQL**
* **TypeORM**
* **JWT (Json Web Token)**
* **bcrypt**
* **Docker**
* **class-validator**

---

# 🏗 Arquitetura do Projeto

O projeto segue a arquitetura modular proposta pelo **NestJS**.

```
src
 ├── auth
 ├── users
 ├── posts
 ├── comments
 ├── database
 ├── common
 │   └── pagination
```

Cada módulo contém:

* **Controller** → recebe requisições HTTP
* **Service** → regra de negócio
* **Entity** → representação da tabela no banco
* **DTO** → validação de dados

---

# 🔐 Autenticação

O sistema utiliza **JWT para autenticação**.

Fluxo:

1. Usuário realiza cadastro
2. Senha é criptografada com **bcrypt**
3. Usuário realiza login
4. API retorna um **access_token**
5. Token é utilizado para acessar rotas protegidas

---

# 👤 Módulo de Usuários

Funcionalidades implementadas:

* Criar usuário
* Buscar usuários
* Buscar usuário por ID
* Atualizar usuário
* Deletar usuário

---

# 📝 Módulo de Posts

Funcionalidades:

* Criar post
* Listar posts
* Buscar post por ID
* Atualizar post
* Deletar post
* Paginação de posts

Relacionamento:

```
User 1 --- N Posts
```

---

# 💬 Módulo de Comentários

Funcionalidades:

* Criar comentário
* Listar comentários
* Buscar comentário
* Atualizar comentário
* Deletar comentário

Relacionamento:

```
User 1 --- N Comments
Post 1 --- N Comments
```

---

# 📦 Instalação do Projeto

Clone o repositório:

```
git clone https://github.com/seu-repo.git
```

Entre na pasta:

```
cd capacitacao-backend-unect
```

Instale as dependências:

```
npm install
```

---

# 🐳 Banco de Dados com Docker

Subir o banco PostgreSQL:

```
docker-compose up -d
```

---

# ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env.example`.

Exemplo:

```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=unect_db

JWT_SECRET=secret
```

---

# 🚀 Rodando o Projeto

Modo desenvolvimento:

```
npm run start:dev
```

---

# 📡 Principais Rotas da API

## Auth

### Registrar usuário

```
POST /auth/register
```

Body:

```
{
 "name": "Mauricio",
 "email": "mauricio@gmail.com",
 "password": "123456"
}
```

---

### Login

```
POST /auth/login
```

Retorno:

```
{
 "id": "uuid",
 "access_token": "jwt_token"
}
```

---

# 📄 Paginação

Exemplo:

```
GET /posts?page=1&limit=10
```

Retorno:

```
{
 data: [],
 meta: {
        "total": 12,
        "page": 2,
        "limit": 10,
        "lastPage": 2
 }
}
```
# 📬 Coleção do Postman

O projeto possui uma coleção do **Postman** com todas as rotas da API já configuradas.

Para importar:

1. Abra o **Postman**
2. Clique em **Import**
3. Selecione o arquivo:

```id="y0d0h6"
postman/capacitacao-backend-unect.postman_collection.json
```

A coleção contém as seguintes rotas:

### Auth

* `POST /auth/register`
* `POST /auth/login`

### Users

* `GET /users`
* `GET /users/:id`
* `PATCH /users/:id`
* `DELETE /users/:id`

### Posts

* `POST /posts`
* `GET /posts`
* `GET /posts/:id`
* `PATCH /posts/:id`
* `DELETE /posts/:id`

### Comments

* `POST /comments`
* `GET /comments`
* `PATCH /comments/:id`
* `DELETE /comments/:id`




---

# 📚 Referências

* https://docs.nestjs.com
* https://typeorm.io
* https://jwt.io

---

# 👨‍💻 Autor

Projeto desenvolvido durante a **Capacitação Backend da UNECT**.
