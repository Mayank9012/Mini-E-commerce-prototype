# Mini E-Commerce Prototype 

## Objective
Develop a basic e-commerce prototype for fashion items using React.

## Features
- **Multi-Page Web App:** Includes Home, Products, Product Details, Cart, and Wishlist pages.
- **Cart Functionality:** Users can add, view, and remove items from the cart.
- **Wishlist:** Users can add products to their wishlist for future reference.
- **User Authentication:** Dummy user login and registration system.
- **Local Storage:** Cart and wishlist data persist across sessions.

## Tech Stack
- **Frontend:** React.js
- **Styling:** Material UI
- **Storage:** Local Storage for cart and wishlist persistence

## Project Structure
```
StyledGenie/
│-- src/
│   ├── components/   # Reusable components (Header, Footer, ProductCard, etc.)
│   ├── pages/        # Main pages (Home, Products, Cart, Wishlist, etc.)
│   ├── data/         # Static files (products.json, categories.json)
│   ├── App.js        # Main application file
│   ├── index.js      # Entry point
│-- public/
│-- package.json


## Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Mayank9012/Mini-E-commerce-prototype.git
   cd e-commerce
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Features Breakdown
### 1. **Homepage**
   - Displays featured fashion items, service highlights and testimonials.
   - Navigation to other pages.

### 2. **Products Page**
   - Lists all fashion products with filtering options.
   - Clicking a product leads to its details page.

### 3. **Product Details Page**
   - Shows detailed information about a selected product.
   - Allows users to add the product to the cart or wishlist.

### 4. **Cart Page**
   - Displays items added to the cart.
   - Supports increasing/decreasing quantity and removing items.

### 5. **Wishlist Page**
   - Allows users to save products for future purchase consideration.

### 6. **User Authentication**
   - Dummy login and registration system (not connected to a backend yet).
   - Stores user session temporarily.

### 7. **Local Storage Persistence**
   - Cart and wishlist data persist even after page reloads.

