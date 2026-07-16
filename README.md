# ShopEase — E-commerce Frontend UI

A lightweight, modern e-commerce frontend built with **HTML + CSS + Bootstrap + Vanilla JavaScript**. It includes a product catalog, product detail page, cart experience, and a simple seller dashboard to add/edit products.

---

## ✨ Features

- **Home / Featured products** with category cards and quick browsing.
- **Product inventory page** with search, category filter, and status filter.
- **Add/Edit product form** with image preview and validation.
- **Single product page** with quantity selector, description tabs, and related items.
- **Cart page** with quantity updates, item removal, and order summary (subtotal, shipping, GST).
- **Client-side persistence** using `localStorage` (demo seeding included).

---

## 🖼️ Screens

> Screenshots are referenced from `assets/screenshots/`.

- **Home** (`index.html`)
  
  ![Home](assets/screenshots/home.png)

- **View Products** (`view-products.html`)
  
  ![View Products](assets/screenshots/view-products.png)

- **Add / Edit Product** (`add-product.html`)
  
  ![Add Product](assets/screenshots/add-product.png)

- **Single Product** (`single-product.html?id=...`)
  
  ![Single Product](assets/screenshots/single-product.png)

- **Cart** (`cart.html`)
  
  ![Cart](assets/screenshots/cart.png)

---

## 🚀 How it Works (Demo)

1. Open `index.html`.
2. The page seeds demo products into `localStorage` so the rest of the app has data.
3. Navigate to:
   - `view-products.html`
   - `add-product.html`
   - `single-product.html?id=...`
   - `cart.html`

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS** (custom styling + responsive design)
- **Bootstrap 5**
- **Vanilla JavaScript** (`localStorage`, DOM rendering, filtering)

---

## 📁 Project Structure

- `index.html` — landing page + featured products
- `view-products.html` — product inventory table (search/filter)
- `add-product.html` — add/edit product dashboard
- `single-product.html` — product detail + tabs + related products
- `cart.html` — cart UI and order summary
- `assets/`
  - `css/` — page-level styles
  - `images/` — product images

---

## Notes

- Cart state is stored under `ec_cart` in `localStorage`.
- Product data is stored under `Products` in `localStorage`.
- Seller actions update the product list instantly (client-side).

