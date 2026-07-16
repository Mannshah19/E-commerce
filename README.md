# ShopEase (E-commerce UI)

A clean, modern front-end mini e-commerce experience with product browsing, product details, cart, and an “add/edit product” dashboard.

> **Note about screenshots:** Add your own screenshots by creating an `assets/screenshots/` folder (or renaming it to match below) and saving the files using the exact names referenced in this README.

---

## Project Pages

### 1) Home (`index.html`)
Shows the hero section, featured products grid, categories, and newsletter.

![Home page](assets/screenshots/home.png)

---

### 2) View Products (`view-products.html`)
Inventory-style product table with search + category/status filters.

![View Products page](assets/screenshots/view-products.png)

---

### 3) Add / Edit Product (`add-product.html`)
Seller dashboard form to publish a new product (or update an existing one), including image preview.

![Add Product page](assets/screenshots/add-product.png)

---

### 4) Single Product (`single-product.html?id=...`)
Detailed product view with description tabs, quantity selector, and related products.

![Single Product page](assets/screenshots/single-product.png)

---

### 5) Cart (`cart.html`)
Cart items stored in `localStorage`, with quantity controls and order summary calculations.

![Cart page](assets/screenshots/cart.png)

---

## How to Run

Because this is a front-end project, you can open the pages directly:

1. Open `index.html` in your browser.
2. Use the navigation menu to visit:
   - `view-products.html`
   - `add-product.html`
   - `single-product.html?id=...`
   - `cart.html`

### Demo data
- The Home page seeds demo products into `localStorage` so the product detail + product list pages have data to show.

---

## Tech Stack

- HTML5
- CSS (custom + responsive styling)
- Bootstrap 5
- Vanilla JavaScript (DOM + `localStorage`)

---

## Project Structure (high level)

- `index.html` – Home / featured products / categories
- `view-products.html` – Product inventory table + filters
- `add-product.html` – Add/Edit product form + image preview
- `single-product.html` – Product detail page with tabs
- `cart.html` – Cart UI + totals
- `assets/`
  - `css/` – page styles
  - `images/` – product images

---

## Screenshots Folder Setup (required)

Create this folder inside the project:

- `assets/screenshots/`

Then add these images (recommended naming):

- `home.png`
- `view-products.png`
- `add-product.png`
- `single-product.png`
- `cart.png`

If you want JPG instead of PNG, keep the same names and update the extensions in the README image links.

