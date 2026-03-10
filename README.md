# Vegist – Multi-Actor E-commerce System

## Project Overview

**Team: Mohamed Mahdy, Ahmed Samy, Yamen Aly, Nada Ayman, Zahwa Kandeel**

Vegist is a professional-grade e-commerce web application dedicated to providing a seamless shopping experience for fresh organic produce. Designed with a robust multi-actor architecture, the system caters to **Customers**, **Sellers**, and **Administrators**, each with tailored functionalities and secure access levels.

Built as a modern, frontend-only application, it leverages **HTML5**, **CSS3 (Bootstrap 5)**, and **JavaScript (ES6+)**. Data persistence is managed entirely through a sophisticated **LocalStorage** implementation, simulating a real-world database environment for a lightweight yet powerful user experience.

---

## 1. Authentication & Security

**Author: Mohamed Mahdy**

The authentication module provides secure access control and identity management for all users.

- **Registration Flow**: Users can register as either a Customer or a Seller. The system validates inputs using **register.js** and seeds the initial Admin and Seller roles automatically.
- **Secure Login**: Implements credential verification in **login.js**. It handles session persistence by setting the `currentUser` in LocalStorage and routes users based on their roles or previous redirect URLs.
- **Client-Side Security**: Passwords are never stored in plain text; they are protected using SHA-256 hashing via the `User.hashPassword` method in **user.js**.
- **Role-Based Access**: Secure routing ensures that Sellers and Admins have exclusive access to their respective dashboards.

---

## 2. Home & Discovery Experience

**Author: Yamen Aly**

The landing page serves as the primary discovery hub, designed to engage users immediately with fresh content.

- **Dynamic Carousels**: The **home.js** script dynamically builds responsive product carousels that adjust based on screen width.
- **Customer Reviews**: Aggregates and displays a "Customer Reviews" section in **home.js** by pulling real feedback from the product data.
- **Promotional Routing**: Direct links to the catalog with pre-applied filters (like "Discount Only") via the `shopnowdisc` handler.

---

## 3. Product Catalog (productList)

**Author: Ahmed Samy**

A highly interactive browsing experience that allows users to find products efficiently.

- **Multi-Faceted Filtering**: Implements a complex filter engine in **productlist.js** allowing simultaneous filtering by category, price range, stock availability, and size.
- **Dual Layout System**: Users can toggle between Grid and List views seamlessly.
- **Smart Pagination**: A custom pagination system in **productlist.js** that dynamically updates based on the number of visible (filtered) items.
- **Dynamic Sorting**: Real-time alphabetical sorting (A-Z and Z-A) that reorders DOM nodes without page reloads.

---

## 4. Product Details & Interaction

**Author: Zahwa Kandeel**

Provides deep insights into individual products and interactive engagement tools.

- **Dynamic Pricing Engine**: Calculates final prices in real-time based on selected weight (KG) and active discounts in **ProductDetails.js**.
- **Advanced Review System**: A full feedback loop where users can submit star ratings and comments. The product's overall rating is automatically recalculated and updated in **ProductDetails.js**.
- **Interactive Quick View**: Developed by **Zahwa Kandeel**, the **PopUpFunctions.js** script enables users to preview details and add to cart directly from the catalog.
- **Related Products**: Suggests similar items to enhance the shopping experience.

---

## 5. Shopping Cart System

**Author: Nada Ayman**

A sophisticated cart implementation that serves as a real-time price calculator.

- **Lifecycle Management**: Supports adding items with specific sizes, quantity adjustments, and removal via **script.js**.
- **Free Shipping Motivator**: A visual progress bar that tracks the subtotal toward a €100 free shipping threshold.
- **Advanced Coupon System**: Provides and applies real-time discount codes (e.g., "SAVE50") in **script.js**.
- **Dynamic Price Synchronization**: Size radio buttons in the cart **script.js** allow users to change weights and see immediate price updates.

---

## 6. Wishlist System

**Author: Nada Ayman**

A complete sub-system for personalized product saving.

- **Persistence**: Allows users to save items across sessions using the `wishlist` storage key.
- **Duplicate Prevention**: Logic in **addToWishlist.js** ensures items aren't added twice.
- **Direct Integration**: The **wishlist script** renders a dedicated view where users can move items straight to the cart or view details.

---

## 7. Checkout & Order Completion

**Author: Mohamed Mahdy**

The finalization layer that converts a cart into a confirmed order.

- **Advanced Coupon System**: Validates and applies real-time discount codes (e.g., "SAVE50") in **checkOut.js**.
- **Order Modeling**: Uses the **order.js** class to build a canonical data structure including shipping fees and customer instructions.
- **Completion Flow**: Clears the cart upon success and persists the record to `doneOrders` for administrative tracking.

---

## 8. User Account & Profile

**Author: Mohamed Mahdy**

A centralized hub for users to manage their personal information.

- **Address Book Management**: Full CRUD operations for shipping addresses in **profileAddress.js**.
- **Default Preferences**: Users can set a "Default Address" which is automatically prioritized during the checkout flow.
- **Profile Overview**: Displays account details and address counts in **profile.js**.

---

## 9. Seller Experience

**Author: Yamen Aly & Zahwa Kandeel**

A dedicated workspace for inventory and sales management.

- **Inventory Control**: Sellers can add and edit products with full validation by **Yamen Aly** in **Product.js**.
- **Product Removal**: Safe deletion logic implemented by **Zahwa Kandeel** in **deleteProduct.js**.
- **Sales Analytics**: Detailed reporting on earnings and recent order history by **Yamen Aly** in **sellerdash.js**.

---

## 10. Admin Dashboard

**Author: Ahmed Samy**

A high-level command center for platform administrators.

- **Platform Analytics**: Aggregates data from all users and orders to show growth trends in **admin.js**.
- **Interactive Revenue Charts**: Visualizes revenue data across different timeframes (Today, Week, Month) using dynamic charting.
- **User Moderation**: Tools to track active vs. blocked users and manage new registrations.

---

## 11. About Us & Company Info

**Author: Nada Ayman**

A static yet essential module providing company background and trust signals.

- **Information Display**: Managed in **aboutUs.html**, providing the mission statement and company values to the end user.

---

## Tech Stack

- **HTML5 / CSS3 (Bootstrap 5)**: Responsive design and UI components.
- **Vanilla JavaScript (ES6 Modules)**: Core business logic and interactivity.
- **LocalStorage**: Persistence layer for users, products, and orders.
- **Chart.js**: Admin dashboard visualizations.

---

## How to Run

1. Clone the repository.
2. Open `index.html` in your browser or use a tool like **Live Server**.
3. No backend setup is required.

---

## Future Extension Points

**Author: Mohamed Mahdy**

- **API Integration**: Transition from LocalStorage to a live backend (REST/GraphQL).
- **JWT Sessions**: Implementation of secure, token-based authentication.
- **Advanced Behavioral Analytics**: Tracking user funnels and heatmaps.

---

_This project demonstrates frontend architecture and e-commerce business logic using vanilla JavaScript._
