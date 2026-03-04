# Vegist Project – Technical Documentation

## Project Overview

- E‑commerce web application focused on fresh produce with catalog browsing, product details, wishlist, cart, checkout, and role-based access (customer, seller, admin).
- Frontend-only stack using HTML, CSS (Bootstrap), JavaScript, and localStorage as the persistence layer.
- Business logic centers around product management, cart operations, order building, and checkout, with analytics for admin.

## Architecture

- Storage-first client architecture; all data flows through localStorage keys:
    - products, cart, wishlist, orders, doneOrders, currentOrder, Users, currentUser
- UI composition:
    - Common header/footer injected via layout initializer.
    - Page-specific scripts handle interactions and data rendering.
- Models:
    - User and Order classes encapsulate data shapes and helper methods.
    - Product class enforces validation and provides serialization helpers.

## Data Models

- Product class with validated properties and derived rating:
    - Class and helpers: [Product.js](file:///d:/Mohamed/Projects/ITI/VegistProject/component/Product.js)
    - Key methods:
        - Constructor sets canonical fields with backing properties.
        - Setters validate inputs (name length, price > 0, stock >= 0, category whitelist, sizes array > 0, image URL format, discount >= 0).
        - Reviews setter validates structure and recomputes average rating.
        - Persistence: [saveProducts](file:///d:/Mohamed/Projects/ITI/VegistProject/component/Product.js#L176-L179), [loadProducts](file:///d:/Mohamed/Projects/ITI/VegistProject/component/Product.js#L180-L199), [editProduct](file:///d:/Mohamed/Projects/ITI/VegistProject/component/Product.js#L201-L261).
- Order class:
    - Shape holder for cart, shipping, discounts, subtotal: [order.js](file:///d:/Mohamed/Projects/ITI/VegistProject/models/order.js)
- User class:
    - Identity, addresses, role, and helpers: [user.js](file:///d:/Mohamed/Projects/ITI/VegistProject/models/user.js)
    - Methods:
        - [ensureAdminExists](file:///d:/Mohamed/Projects/ITI/VegistProject/models/user.js#L17-L36) and [defaultSeller](file:///d:/Mohamed/Projects/ITI/VegistProject/models/user.js#L38-L57) seed roles.
        - [hashPassword](file:///d:/Mohamed/Projects/ITI/VegistProject/models/user.js#L59-L72) for SHA‑256 hashing.
        - [emailExists](file:///d:/Mohamed/Projects/ITI/VegistProject/models/user.js#L74-L78) local lookup.
        - Address management: [addAddress](file:///d:/Mohamed/Projects/ITI/VegistProject/models/user.js#L81-L86), [getAddresses](file:///d:/Mohamed/Projects/ITI/VegistProject/models/user.js#L107-L110).
        - Session persistence: [saveCurrentUser](file:///d:/Mohamed/Projects/ITI/VegistProject/models/user.js#L88-L91), [updateUsersArray](file:///d:/Mohamed/Projects/ITI/VegistProject/models/user.js#L93-L105), [saveUser](file:///d:/Mohamed/Projects/ITI/VegistProject/models/user.js#L112-L117).

## Core Modules

- Base path detection:
    - [getBasePath](file:///d:/Mohamed/Projects/ITI/VegistProject/component/basepath.js#L3-L15): Computes relative base for linking assets across nested pages.
- Auth state:
    - [isAuth](file:///d:/Mohamed/Projects/ITI/VegistProject/component/isAuth.js#L2-L6): Reads currentUser from storage.
    - Logout: [logout.js](file:///d:/Mohamed/Projects/ITI/VegistProject/component/logout.js) sets returnUrl and clears session.
- Theme toggle:
    - [moodToggle.js](file:///d:/Mohamed/Projects/ITI/VegistProject/component/moodToggle.js): Toggles Bootstrap data-bs-theme with button state.
- Header/Footer composition:
    - [header](file:///d:/Mohamed/Projects/ITI/VegistProject/component/header.js) and [footer](file:///d:/Mohamed/Projects/ITI/VegistProject/component/footer.js) return HTML; [layout.js](file:///d:/Mohamed/Projects/ITI/VegistProject/component/layout.js) injects into page.

## Product Seeding

- Dummy data load:
    - [dummyproducts.js](file:///d:/Mohamed/Projects/ITI/VegistProject/seller/JS/dummyproducts.js): Creates Product instances and saves to localStorage if absent.

## Product Listing and Filters

- Page script builds two layouts and offers filters, sorting, and pagination:
    - [productlist.js](file:///d:/Mohamed/Projects/ITI/VegistProject/productList/JS/productlist.js)
    - Card construction per product (two layouts) with discount badge and rating stars.
    - Helpers:
        - [generateStars](file:///d:/Mohamed/Projects/ITI/VegistProject/productList/JS/productlist.js#L34-L44), [generateStars layout2](file:///d:/Mohamed/Projects/ITI/VegistProject/productList/JS/productlist.js#L116-L126)
    - Filtering:
        - Active filter state: [activeFilters](file:///d:/Mohamed/Projects/ITI/VegistProject/productList/JS/productlist.js#L203-L209)
        - [applyFilters](file:///d:/Mohamed/Projects/ITI/VegistProject/productList/JS/productlist.js#L211-L265) applies category, stock, price, sizes, and discountOnly.
    - Pagination:
        - [setupPagination](file:///d:/Mohamed/Projects/ITI/VegistProject/productList/JS/productlist.js#L621-L663), with [showPage](file:///d:/Mohamed/Projects/ITI/VegistProject/productList/JS/productlist.js#L629-L634) and [createPagination](file:///d:/Mohamed/Projects/ITI/VegistProject/productList/JS/productlist.js#L636-L659).
    - Sorting:
        - Alphabetical ascending/descending handlers reposition cards.
    - Actions:
        - .btnbag/.btnbag2 add items to cart; .btnheart/.btnheart2 add to wishlist; .btneye opens quick view.

## Wishlist

- Add to wishlist:
    - [addToWishlist](file:///d:/Mohamed/Projects/ITI/VegistProject/component/addToWishlist.js#L1-L17): Prevents duplicates; persists wishlist array.
- Wishlist page:
    - [wishlist script](file:///d:/Mohamed/Projects/ITI/VegistProject/wishlist/JS/script.js): [displayWishlist](file:///d:/Mohamed/Projects/ITI/VegistProject/wishlist/JS/script.js#L15-L54) renders product cards or empty state by matching wishlist entries to products.

## Cart and Checkout

- Add to cart:
    - [addToCart](file:///d:/Mohamed/Projects/ITI/VegistProject/component/addToCart.js#L3-L16): Merges quantities for existing item; supports size.
- Cart page:
    - [cart script](file:///d:/Mohamed/Projects/ITI/VegistProject/cart/JS/script.js)
    - Rendering:
        - [displayCart](file:///d:/Mohamed/Projects/ITI/VegistProject/cart/JS/script.js#L107-L192) builds UI, includes size chooser and item totals with discounts.
    - Size controls:
        - [checkSize](file:///d:/Mohamed/Projects/ITI/VegistProject/cart/JS/script.js#L198-L226) generates radio inputs and syncs selection back to cart.
        - Change handler updates storage and re-renders.
    - Quantity and removal:
        - [removeFromCart](file:///d:/Mohamed/Projects/ITI/VegistProject/cart/JS/script.js#L249-L253), [increaseQuantity](file:///d:/Mohamed/Projects/ITI/VegistProject/cart/JS/script.js#L265-L270), [decreaseQuantity](file:///d:/Mohamed/Projects/ITI/VegistProject/cart/JS/script.js#L272-L282).
    - Shipping progress:
        - [checkFreeShipping](file:///d:/Mohamed/Projects/ITI/VegistProject/cart/JS/script.js#L298-L309) updates progress bar and message toward €100 threshold.
    - Discounts:
        - Coupon list and [apply button handler](file:///d:/Mohamed/Projects/ITI/VegistProject/cart/JS/script.js#L315-L333) set appliedCoupon.
        - [calculateSubtotal](file:///d:/Mohamed/Projects/ITI/VegistProject/cart/JS/script.js#L339-L363) computes discounted totals, applies coupon, and updates UI.
    - Build and persist order:
        - [buildOrderData](file:///d:/Mohamed/Projects/ITI/VegistProject/cart/JS/script.js#L376-L404) sets shipping fees (free at ≥ €100), attaches discount_code and instructions, stores currentOrder.
    - Checkout:
        - [checkout-btn](file:///d:/Mohamed/Projects/ITI/VegistProject/cart/JS/script.js#L410-L433) validates size selection, appends to orders, clears cart, and redirects to checkout page.

## Product Details & Quick View

- Product details page:
    - [ProductDetails.js](file:///d:/Mohamed/Projects/ITI/VegistProject/productDetials/JS/ProductDetails.js)
    - Loads product by ID, fills detail UI, shows discount and size selection.
    - Actions:
        - Add to wishlist/cart, remove product (seller view): [deleteProductById](file:///d:/Mohamed/Projects/ITI/VegistProject/component/deleteProduct.js#L6-L12).
        - Price computation: [getFinalPrice logic](file:///d:/Mohamed/Projects/ITI/VegistProject/productDetials/JS/ProductDetails.js#L57-L71), size change updates: [handler](file:///d:/Mohamed/Projects/ITI/VegistProject/productDetials/JS/ProductDetails.js#L187-L209).
        - Subtotal: [calculateSubTotal](file:///d:/Mohamed/Projects/ITI/VegistProject/productDetials/JS/ProductDetails.js#L135-L141).
        - Order creation: [buyItNow](file:///d:/Mohamed/Projects/ITI/VegistProject/productDetials/JS/ProductDetails.js#L143-L169).
    - Reviews:
        - Star UI and rating capture; form submit validates, pushes review, updates product rating, and re-renders reviews: [displayReviews](file:///d:/Mohamed/Projects/ITI/VegistProject/productDetials/JS/ProductDetails.js#L378-L409).
    - Related products:
        - [loadRelatedProducts](file:///d:/Mohamed/Projects/ITI/VegistProject/productDetials/JS/ProductDetails.js#L213-L231) fills cards list.
- Quick view modal:
    - [PopUpFunctions.js](file:///d:/Mohamed/Projects/ITI/VegistProject/component/PopUpFunctions.js)
    - Fetches modal HTML, binds interactions, computes prices with discount and size, supports Add to Cart and Buy It Now: [buyItNow](file:///d:/Mohamed/Projects/ITI/VegistProject/component/PopUpFunctions.js#L114-L143).

## Product Editing

- Edit product flow:
    - [initializeEditProduct](file:///d:/Mohamed/Projects/ITI/VegistProject/component/editProduct.js#L2-L123) preloads form, validates inputs, writes back, and saves: [saveProducts](file:///d:/Mohamed/Projects/ITI/VegistProject/component/Product.js#L176-L179).
- Delete product:
    - [deleteProductById](file:///d:/Mohamed/Projects/ITI/VegistProject/component/deleteProduct.js#L6-L12) filters products array and saves.

## Authentication

- Registration:
    - [register.js](file:///d:/Mohamed/Projects/ITI/VegistProject/auth/JS/register.js)
    - Validates names, email, strong password, role selection; hashes password; seeds default admin and seller; persists to Users.
- Login:
    - [login.js](file:///d:/Mohamed/Projects/ITI/VegistProject/auth/JS/login.js)
    - Validates email; loads user; hashes provided password and compares; persists session to currentUser; redirects by role or returnUrl.

## Checkout

- Checkout UI:
    - [checkOut.js](file:///d:/Mohamed/Projects/ITI/VegistProject/checkOut/JS/checkOut.js)
    - Loads currentOrder and currentUser; fills order products with computed totals and discount presentation; handles saving new default address; computes final totals; completes order.
    - Address management uses User methods for saving and default handling.
    - Done orders:
        - [getDoneOrders](file:///d:/Mohamed/Projects/ITI/VegistProject/checkOut/JS/checkOut.js#L231-L233), [addDoneOrder](file:///d:/Mohamed/Projects/ITI/VegistProject/checkOut/JS/checkOut.js#L235-L239) store completed orders for admin analytics.

## Admin Dashboard

- Metrics driven by Users, orders, and doneOrders:
    - [admin.js](file:///d:/Mohamed/Projects/ITI/VegistProject/admin/JS/admin.js)
    - Aggregates counts for total users, active users (users with done orders), new registrations, and contacts from pending orders.
    - Revenue charts:
        - Time bucketing and aggregation: [getRevenueData](file:///d:/Mohamed/Projects/ITI/VegistProject/admin/JS/admin.js#L232-L299)
        - Chart updating: [updateChart](file:///d:/Mohamed/Projects/ITI/VegistProject/admin/JS/admin.js#L345-L350)
    - Utility percentage:
        - [calculatePercent](file:///d:/Mohamed/Projects/ITI/VegistProject/admin/JS/admin.js#L55-L57)

## Utilities

- Country fetcher:
    - [countries.js](file:///d:/Mohamed/Projects/ITI/VegistProject/component/countries.js): Populates country select from external API.
- Product getters:
    - [getProduct.js](file:///d:/Mohamed/Projects/ITI/VegistProject/component/getProduct.js): getAllProducts and getProductById access storage.

## Storage Keys

- products: Array of Product instances persisted as plain objects.
- wishlist: Array of { product_id }.
- cart: Array of { product_id, quantity, size }.
- orders: Array of Order objects created at cart checkout.
- currentOrder: Currently building/selected order for checkout.
- doneOrders: Completed orders captured at checkout confirmation.
- Users: Array of User objects (admin, seller, customer).
- currentUser: Logged-in user object for session.
- Productsreview: Optional key storing review list per product interactions.

## Business Logic Flow

- Initialization:
    - Seed Users and products if missing; header/footer injected; theme ready.
- Browsing:
    - Product listing builds cards; filters update visible sets; pagination and sorting operate on DOM nodes.
- Engagement:
    - Quick view provides immediate price, size selection, and cart/wishlist links.
    - Product details offer comprehensive information and reviews submission.
- Cart:
    - Items accumulate with sizes and discounts; shipping progress encourages reaching free threshold.
- Checkout:
    - Validates requirements (sizes selected); builds Order; persists orders and redirects.
    - Address management supports default address and saving to user profile.
- Completion:
    - Finalizes a done order and cleans up cart; supports admin analytics.

## Validation and Error Handling

- Product setters enforce constraints and throw errors on invalid data.
- Edit product form validates and presents inline feedback before saving.
- Auth validates email/password and alerts on invalid credentials.
- Cart and checkout guard against missing size selections and ensure expected totals.

## Extension Points

- Persistence:
    - Replace localStorage with API calls; map User/Product/Order methods to backend endpoints.
- Pricing:
    - Enhance discount logic (coupon rules, time-based sales) in subtotal calculation.
- Reviews:
    - Moderate reviews and prevent duplicate submissions.
- Security:
    - Move hashing and authentication to secure backend, add token-based sessions.

## Function Index

- Components:
    - header() → returns header HTML: [header.js](file:///d:/Mohamed/Projects/ITI/VegistProject/component/header.js)
    - footer() → returns footer HTML: [footer.js](file:///d:/Mohamed/Projects/ITI/VegistProject/component/footer.js)
    - getBasePath() → relative path builder: [basepath.js](file:///d:/Mohamed/Projects/ITI/VegistProject/component/basepath.js#L3-L15)
    - isAuth() → current user getter: [isAuth.js](file:///d:/Mohamed/Projects/ITI/VegistProject/component/isAuth.js#L2-L6)
    - addToCart(product_id, quantity, size) → cart mutation: [addToCart.js](file:///d:/Mohamed/Projects/ITI/VegistProject/component/addToCart.js#L3-L16)
    - addToWishlist(product_id) → wishlist mutation: [addToWishlist.js](file:///d:/Mohamed/Projects/ITI/VegistProject/component/addToWishlist.js#L1-L17)
    - initializeEditProduct(productId) → prepares edit form and saves: [editProduct.js](file:///d:/Mohamed/Projects/ITI/VegistProject/component/editProduct.js#L2-L123)
    - deleteProductById(id) → removes product: [deleteProduct.js](file:///d:/Mohamed/Projects/ITI/VegistProject/component/deleteProduct.js#L6-L12)
    - loadProducts/saveProducts/editProduct → model persistence: [Product.js](file:///d:/Mohamed/Projects/ITI/VegistProject/component/Product.js)
    - PopUpFunctions modal: buyItNow(), price calc, event handlers: [PopUpFunctions.js](file:///d:/Mohamed/Projects/ITI/VegistProject/component/PopUpFunctions.js)
- Pages:
    - productlist.js:
        - generateStars(rating), applyFilters(), setupPagination(), sorting handlers.
    - wishlist/script.js:
        - displayWishlist() renders list.
    - cart/script.js:
        - displayCart(), checkSize(), removeFromCart(), increaseQuantity(), decreaseQuantity(), checkFreeShipping(), calculateSubtotal(), buildOrderData().
    - productDetials/ProductDetails.js:
        - getFinalPrice(), calculateSubTotal(), buyItNow(), loadRelatedProducts(), displayReviews().
    - checkOut/checkOut.js:
        - getDoneOrders(), addDoneOrder(), order completion handler, address persistence.
    - admin/admin.js:
        - calculatePercent(), formatHour(), getRevenueData(), updateChart().
- Models:
    - User methods listed under Data Models; Order constructor under models/order.js; Product setters/getters and helpers under component/Product.js.

---

For any part of this documentation, refer to the linked source files for exact implementations and line references. This document provides a guided map of the system’s functions and business logic to support maintenance and future enhancements.
