Perfeito, agora com todas as informações que você passou, aqui está o **README** em inglês, pronto para o GitHub:

---

# E-Shop API

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
