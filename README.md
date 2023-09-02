# Banoqabil Final Project - MERN Stack E-Commerce Web Application

![Project Preview](https://firebasestorage.googleapis.com/v0/b/bq-final-project-storage.appspot.com/o/images%2Ftechtonic-screenshot.png?alt=media&token=94091c5c-b5be-4362-99d8-8d968d2bec17)

## Project Overview

A robust E-Commerce web application using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The app features multiple user roles (guest, admin, user), authentication using JWT and encrypted passwords, product management with brands and categories, image uploading to Firebase, order placement with tracking functionality, and user order tracking.

## Features

### User Roles

- Guest: Unauthenticated visitors who can browse products.
- User: Authenticated customers who can add products to a cart, place orders, and track orders.
- Admin: Authenticated administrators with access to product management and order tracking.

### Authentication

- Implement user registration and login using JWT for secure authentication.
- Store hashed and salted passwords in the database for enhanced security.

### Product Management

- Create a user-friendly interface for adding, editing, and deleting products.
- Implement categories and brands to organize products.
- Enable sorting and filtering options for a better user experience.

### Review Component

- Create a new component for submitting reviews.
- Include fields for rating (e.g., stars), title, and detailed text feedback.

### Image Uploading

- Integrate Firebase for image storage.
- Allow uploading of images for brands, categories, and products.
- Implement multiple image uploads for products.

### Order Placement

- Users can add products to their cart and place orders.
- Generate a unique tracking ID for each order.
- Store order details in the database for future reference.

### Email Notifications

- When an order is placed, the admin is notified via email, including the tracking ID.
- Use nodemailer or a similar service to send emails.

### User Order Tracking

- Users can track their orders using the provided tracking ID.
- Implement a user-friendly interface to display order status and progress.

## Technical Implementation

### Frontend (React.js)

- Create components for user registration, login, product listing, cart, order placement, order tracking, etc.
- Utilize routing to manage different user roles and navigation.
- Integrate Firebase SDK for image uploading.

### Backend (Node.js and Express.js)

- Develop RESTful APIs for user authentication, product management, order placement, and tracking.
- Implement middleware for role-based authentication and authorization.
- Use JWT for token-based authentication.

### Database (MongoDB)

- Design the database schema for users, products, orders, categories, and brands.
- Establish relationships between entities (e.g., products associated with categories and brands).

### Firebase Integration

- Set up a Firebase project for image storage.
- Integrate Firebase SDK in the backend to handle image uploads.

### Email Notification

- Use nodemailer or a similar library to send email notifications to admin and users.
- Create templates for order confirmation and tracking emails.
## API Reference

### Users
#### Signup User

```http
  POST /api/signup
```
Sign up a new user with a unique username and a valid email address.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. User's desired username |
|   `email`  | `String` || **Required**. User's email |
|   `contact`  | `String` || **Required**. User's contact number |
|   `address`  | `String` || **Required**. User's address |
|   `password`  | `String` || **Required**. User's password |

#### Login User

```http
  POST /api/login
```
Login user with email and password he used to sign in.

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. User's email |
| `email`      | `string` | **Required**. User's password |

#### Get Users data

```http
  GET /api/getallusers
```
Retrieve data of all signed up users.

| Header | Value     |
| :-------- | :------- |
| `Authorization`      | **Required**. Cyclic basic auth  |

#
### Category
#### Add Category

```http
  POST /api/add-category
```
Add a Category

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `CategoryName`      | `string` | **Required**. Category Name |
| `CategoryImage`      | `string` | **Required**. Category Image |

#### All Category

```http
  GET /api/all-categories
```
Retrieve data of all categories

#### Category by Name

```http
  GET /api/categorybyname
```
Retrieve data of category by its name.

| Query Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Category Name |

#### Delete Category

```http
  DELETE /api/delete-category
```
Delete category by it name.

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `CategoryName`      | `string` | **Required**. Category Name |

#### Update Category

```http
  PUT /api/update-category
```
Update a exsisting category.

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `CategoryName`      | `string` | **Required**. Category Name |
| `_id`      | `string` | **Required**. Category id |
| `CategoryImage`      | `string` | **Required**. Category Image |

#
### Products
#### Add Product

```http
  POST /api/add-products
```
Creates a new product.

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `productName`      | `string` | **Required**. Product Name |
| `thumbnail`      | `string` | **Required**. Product Thumbnail |
| `Description`      | `string` | **Required**. Product Description |
| `price`      | `string` | **Required**. Product Price |
| `category`      | `string` | **Required**. Product Category |
| `images`      | `Array` | **Required**. Product Images |


#### Product by Id

```http
  GET /api/product-by-id/_id
```
Retrieves data of product by its id

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `_id`      | `string` | **Required**. Product Id |

#### Product by Category

```http
  GET /api/product-by-category/:category
```
Retrieves data of product by its category

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `category `      | `string` | **Required**. Product Category |

#### All Products

```http
  GET /api/all-products
```
Retrieves data of all products.

#### Delete Product

```http
  DELETE /api/delete-products
```
Deletes a product.

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `productName  `      | `string` | **Required**. Product Name |

#
### Orders
#### Place Order

```http
  DELETE /api/place-order
```
Makes an order

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `customerName`      | `string` | **Required**. Customer Name |
| `customerEmail`      | `string` | **Required**. Customer Email |
| `customerId`      | `string` | **Required**. Customer Id |
| `customerContact`      | `string` | **Required**. Customer Contact Number |
| `customerAddress`      | `string` | **Required**. Customer Address |
| `order`      | `Array` | **Required**. All Orders Data |

#### All Orders

```http
  DELETE /api/get-all-orders
```
Retrieve data of all orders.

#### Track Order

```http
  DELETE /api/track-order/:_id
```
Track placed order by its id.

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `_id  `      | `string` | **Required**. Order Id Given to User|
