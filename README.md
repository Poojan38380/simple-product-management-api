# Simple Product Management API

This project is a simple API for managing products, built using **Node.js**, **Express.js**, and **Sequelize ORM** for database interactions. It provides endpoints for creating, reading, updating, and deleting (CRUD) products.

## Features

- Create a new product with `name` - string, `price` - float, `description` - string(optional), and `category` - string.
- Fetch all products with pagination, search, and filtering options.
- Retrieve a single product by its ID.
- Update an existing product's details.
- Delete a product by its ID.

## Technologies Used
- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework for building the API.
- **Sequelize**: ORM for database interaction.
- **PostgreSQL**: Relational database.

## Installation and Setup

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/simple-product-management-api.git
   cd simple-product-management-api
   ```

2. **Install dependencies:**
   ```bash
    npm install
    ```
   
3. **Configure the database: Rename the .env file in the root directory to exaple.env. And add the postgreSQL DATABASE_URL**
   ```bash
   DATABASE_URL=
   PORT= 3001
    ```
4. **Start the application:**
   
   ***for development***
   ```bash
   npm run devstart 
   ```
   ***for producion/deployment***
   ```bash
   npm start
   ```
    The server should now be running on `http://localhost:3000`.

## Endpoints

### 1. Create a Product

- **Endpoint**: `POST /api/products`
- **Description**: Creates a new product with `name`, `price`, `description`, and `category`.

    - **Request Body**:
      ```json
      {
        "name": "Product Name",
        "price": 100,
        "description": "Product Description",
        "category": "Product Category"
      }
      ```

    - **Response**:
      ```json
      {
        "message": "Product created successfully.",
        "product": {
          "id": 1,
          "name": "Product Name",
          "price": 100,
          "description": "Product Description",
          "category": "Product Category",
          "createdAt": "2024-10-10T08:30:21.000Z",
          "updatedAt": "2024-10-10T08:30:21.000Z"
        }
      }
      ```

### 2. Get All Products

- **Endpoint**: `GET /api/products`
- **Description**: Retrieves all products with pagination, search by name, and filter by category.
  
    - **Query Parameters**:
      - `page` (optional): Page number, defaults to 1.
      - `limit` (optional): Number of items per page, defaults to 10.
      - `name` (optional): Search by product name.
      - `category` (optional): Filter by category.

    - **Response**:
      ```json
      {
        "totalItems": 50,
        "totalPages": 5,
        "currentPage": 1,
        "products": [
          {
            "id": 1,
            "name": "Product Name",
            "price": 100,
            "description": "Product Description",
            "category": "Product Category",
            "createdAt": "2024-10-10T08:30:21.000Z",
            "updatedAt": "2024-10-10T08:30:21.000Z"
          }
        ]
      }
      ```

### 3. Get Single Product

- **Endpoint**: `GET /api/products/:productId`
- **Description**: Retrieves a single product by its ID.

    - **Response**:
      ```json
      {
        "product": {
          "id": 1,
          "name": "Product Name",
          "price": 100,
          "description": "Product Description",
          "category": "Product Category",
          "createdAt": "2024-10-10T08:30:21.000Z",
          "updatedAt": "2024-10-10T08:30:21.000Z"
        }
      }
      ```

### 4. Update Product

- **Endpoint**: `PUT /api/products/:productId`
- **Description**: Updates an existing product by its ID.

    - **Request Body** (you can update any field):
      ```json
      {
        "name": "Updated Product Name",
        "price": 150,
        "description": "Updated Description",
        "category": "Updated Category"
      }
      ```

    - **Response**:
      ```json
      {
        "message": "Product updated successfully.",
        "product": {
          "id": 1,
          "name": "Updated Product Name",
          "price": 150,
          "description": "Updated Description",
          "category": "Updated Category",
          "createdAt": "2024-10-10T08:30:21.000Z",
          "updatedAt": "2024-10-10T09:30:21.000Z"
        }
      }
      ```

### 5. Delete Product

- **Endpoint**: `DELETE /api/products/:productId`
- **Description**: Deletes a product by its ID.

    - **Response**:
      ```json
      {
        "message": "Product deleted successfully."
      }
      ```

## Error Handling

- 400: Bad Request (e.g., invalid or missing fields)
- 404: Product Not Found
- 500: Internal Server Error

## Database Schema

The product model contains the following fields:

- `id` (Primary Key)
- `name` (String)
- `price` (Number)
- `description` (String, Optional)
- `category` (String)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

Poojan Goyani
