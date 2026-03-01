# Vegist -- Fresh Produce E-Commerce (Frontend Project)

## Project Overview

Vegist is a frontend-only e-commerce web application focused on fresh
produce.

It provides: - Product catalog browsing (grid & list layouts) - Product
details with reviews and related products - Wishlist management - Cart
with size selection, discounts, and shipping logic - Checkout with
address management - Role-based access (Customer, Seller, Admin) - Admin
dashboard with revenue analytics

The project is built using: - HTML5 - CSS3 (Bootstrap 5) - JavaScript
(ES6 Modules) - localStorage as the persistence layer

No backend or database is used. All data is stored in the browser.

------------------------------------------------------------------------

## Features

### Customer

-   Browse products with filtering, sorting, and pagination
-   View product details and reviews
-   Add products to wishlist
-   Add products to cart (with size & quantity)
-   Apply discount coupons
-   Free shipping progress tracking
-   Checkout with address saving
-   Submit product reviews

### Seller

-   Add, edit, and delete products
-   Manage product details

### Admin

-   Dashboard metrics:
    -   Total users
    -   Active users
    -   New registrations
    -   Pending contacts (orders)
-   Revenue analytics
-   View completed orders

------------------------------------------------------------------------

## Tech Stack

-   HTML5
-   Bootstrap 5
-   Vanilla JavaScript (ES6 Modules)
-   Chart.js (Admin dashboard)
-   Browser localStorage

------------------------------------------------------------------------

## Architecture

### Storage Keys

-   products
-   cart
-   wishlist
-   orders
-   currentOrder
-   doneOrders
-   Users
-   currentUser
-   Productsreview

All application data flows through these keys.

------------------------------------------------------------------------

## Data Models

### Product Model

-   Validates product fields
-   Calculates rating from reviews
-   Handles serialization and persistence

### User Model

-   Seeds default admin and seller
-   Hashes password (SHA‑256)
-   Manages addresses
-   Handles session persistence

### Order Model

-   Stores cart items
-   Handles shipping and discounts
-   Calculates totals

------------------------------------------------------------------------

## Business Flow

1.  Seed users and products (if missing)
2.  Browse products (filter, sort, paginate)
3.  Add to wishlist or cart
4.  Apply discounts and check shipping progress
5.  Checkout and save order
6.  Admin analytics update

------------------------------------------------------------------------

## Shipping Logic

-   Free shipping at €100+
-   Dynamic subtotal recalculation
-   Progress indicator in cart

------------------------------------------------------------------------

## Authentication

### Registration

-   Email validation
-   Strong password validation
-   Role selection
-   SHA‑256 hashing

### Login

-   Email lookup
-   Password hashing and comparison
-   Role-based redirection

------------------------------------------------------------------------

## How to Run

1.  Clone the repository
2.  Open index.html in your browser

OR use Live Server in VS Code.

No backend setup required.

------------------------------------------------------------------------

## Future Improvements

-   Replace localStorage with REST API
-   Add JWT authentication
-   Move validation to backend
-   Add seller analytics
-   Enhance coupon rules

------------------------------------------------------------------------

## Author

Mohamed Mahdy

This project demonstrates frontend architecture and e-commerce business
logic using vanilla JavaScript.
