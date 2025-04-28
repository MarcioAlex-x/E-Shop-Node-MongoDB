# E-Shop API - Inglês

Welcome to the **E-Shop API**!  
This project provides a simple, ready-to-use online REST API for product and category management, built with **Node.js**, **Express**, and **MongoDB**.

This API is intended for demonstration purposes (such as job applications) and is hosted on **Vercel**.

## Base URL
```
https://eshop-tau-two.vercel.app/api/v1
```

## Public Endpoints

- **List all categories**  
  `GET /categories`
  
- **List all products**  
  `GET /products`
  
- **Get a specific category by ID**  
  `GET /categories/:id`
  
- **Get a specific product by ID**  
  `GET /products/:id`

## Authentication

To access protected routes, you must first **login** using the credentials below:

```
POST /users/login
```

Body:
```json
{
  "email": "bia@email.com",
  "password": "123456789"
}
```

- After successful login, a **JWT token** will be returned.
- Include the token in your requests using the `Authorization` header:

```
Authorization: Bearer YOUR_TOKEN_HERE
```

You can also **register** a new user via:

```
POST /users/register
```

## Protected Endpoints

### (GET) User Routes (Protected)
- `GET /users/` – List all users
- `GET /users/:id` – Get a user by ID

### (POST) Create
- `POST /products` – Create a new product
- `POST /categories` – Create a new category

### (PUT) Update
- `PUT /products` – Update an existing product
- `PUT /categories` – Update an existing category

### (DELETE) Delete
- `DELETE /products` – Delete a product
- `DELETE /categories` – Delete a category

## Special Endpoints

- **List featured products**  
  `GET /products/featured/products`

- **List a specific number of featured products**  
  `GET /products/featured/products/:counts`

## Notes

- **Database**: This project uses **MongoDB**, so the API responses are based on MongoDB collections (JSON format).
- **Error Handling**: If something goes wrong, the API returns:
  ```json
  {
    "message": "Something went wrong"
  }
  ```
- **No Rate Limits** are applied.
- **Recommended Tools**: You can use tools like **Postman** or **Insomnia** for API testing.

---

## Example: Fetch all products

```bash
curl https://eshop-tau-two.vercel.app/api/v1/products
```

## Example: Protected request (with Token)

```bash
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" https://eshop-tau-two.vercel.app/api/v1/users/
```

---

# License

This project is available for educational and demonstration purposes.

---

# API E-Shop - Português

Bem-vindo à **API E-Shop**!  
Este projeto oferece uma API REST online, simples e pronta para uso, para gerenciamento de produtos e categorias, construída com **Node.js**, **Express** e **MongoDB**.

Esta API foi desenvolvida para fins de demonstração (como em processos seletivos) e está hospedada na **Vercel**.

## URL Base
```
https://eshop-tau-two.vercel.app/api/v1
```

## Endpoints Públicos

- **Listar todas as categorias**  
  `GET /categories`
  
- **Listar todos os produtos**  
  `GET /products`
  
- **Obter uma categoria específica pelo ID**  
  `GET /categories/:id`
  
- **Obter um produto específico pelo ID**  
  `GET /products/:id`

## Autenticação

Para acessar as rotas protegidas, é necessário **fazer login** utilizando as credenciais abaixo:

```
POST /users/login
```

Body:
```json
{
  "email": "bia@email.com",
  "password": "123456789"
}
```

- Após o login, um **token JWT** será retornado.
- Para acessar as rotas protegidas, envie o token no cabeçalho `Authorization`:

```
Authorization: Bearer SEU_TOKEN_AQUI
```

Você também pode **registrar** um novo usuário utilizando:

```
POST /users/register
```

## Endpoints Protegidos

### (GET) Rotas de Usuários
- `GET /users/` – Listar todos os usuários
- `GET /users/:id` – Buscar um usuário específico pelo ID

### (POST) Criar
- `POST /products` – Criar um novo produto
- `POST /categories` – Criar uma nova categoria

### (PUT) Atualizar
- `PUT /products` – Atualizar um produto existente
- `PUT /categories` – Atualizar uma categoria existente

### (DELETE) Deletar
- `DELETE /products` – Deletar um produto
- `DELETE /categories` – Deletar uma categoria

## Endpoints Especiais

- **Listar produtos em destaque**  
  `GET /products/featured/products`

- **Listar uma quantidade específica de produtos em destaque**  
  `GET /products/featured/products/:counts`

## Observações

- **Banco de Dados**: Este projeto utiliza **MongoDB**, portanto as respostas são retornadas em formato JSON baseado em coleções.
- **Tratamento de Erros**: Se algo der errado, a API retorna:
  ```json
  {
    "message": "Something went wrong"
  }
  ```
- **Sem Limites de Requisições**: Não há limitação de requisições configurada.
- **Ferramentas Recomendadas**: Utilize ferramentas como **Postman** ou **Insomnia** para testar os endpoints da API.

---

## Exemplo: Buscar todos os produtos

```bash
curl https://eshop-tau-two.vercel.app/api/v1/products
```

## Exemplo: Requisição Protegida (com Token)

```bash
curl -H "Authorization: Bearer SEU_TOKEN_AQUI" https://eshop-tau-two.vercel.app/api/v1/users/
```

---

# Licença

Este projeto está disponível para fins educacionais e de demonstração.

---

# Desenvolvida por Alex Freitas - 2025
