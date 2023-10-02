# Ecommerce Project

This is a sample README file for an eCommerce project, divided into two main folders: `frontend` and `server-db`.

## Frontend

### Description
The `frontend` folder contains the client-side code for the eCommerce web application. It's responsible for rendering the user interface, handling user interactions, and communicating with the server for data.

### Technologies Used
- React.js
- React Router
- Redux (or any state management library of choice)
- HTML/CSS
- JavaScript (ES6+)

### Getting Started
1. Clone the repository.
2. Navigate to the `frontend` directory.
3. Run `npm install` to install project dependencies.
4. Run `npm start` to start the development server.
5. Open your web browser and access the application at `http://localhost:3000`.

### Features
- User Registration and Login
- Browse Product Catalog
- Add Products to Cart
- View and Edit Cart
- User Profile
- Product Details
- ... (List other features of your frontend here)

## Server-DB

### Description
The `server-db` folder contains the server-side and database code for the eCommerce application. It's responsible for handling API requests, managing user data, product data, and order data.

### Technologies Used
- Node.js (Express.js for server)
- MongoDB (or any database of choice)
- Mongoose (for database interactions)
- RESTful API design

### Getting Started
1. Clone the repository.
2. Navigate to the `server-db` directory.
3. Run `npm install` to install project dependencies.
4. Set up a MongoDB database and configure the connection in `server.js`.
5. Run `npm start` to start the server.
6. The server will be available at `http://localhost:8080`.

### API Endpoints
- `POST /register` - User registration
- `POST /login` - User login
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create a new product (admin)
- `PUT /products/:id` - Update product by ID (admin)
- `DELETE /products/:id` - Delete product by ID (admin)
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user profile by ID
- `GET /cart/:userId` - Get user's cart
- `POST /cart/:userId` - Add product to user's cart
- `PUT /cart/:userId/:productId` - Update product quantity in cart
- `DELETE /cart/:userId/:productId` - Remove product from cart

### Database Schema
- `User` schema (Fields: id, username, password, name, email, address, phone, role)
- `Product` schema (Fields: id, title, description, price, image, category)
- `Cart` schema (Fields: userId, productId, quantity)
- `Order` schema (Fields: userId, products, total, date)

### Authentication
Implement user authentication using JWT (JSON Web Tokens) or any other method of your choice.

## Project Structure
`frontend` and backend I named it `server-db`

## Deployment
I used Render.com to deploy my `server-db` and Netfly for `frontend`

## License
This project is licensed under the [MIT License](LICENSE).
