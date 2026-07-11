// ── Storage helpers ──────────────────────────────────────────────
const PRODUCTS_KEY = 'ec_products';
const CART_KEY = 'ec_cart';

function getProducts() {
  return JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
}
function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}
function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// ── Cart count badge ─────────────────────────────────────────────
function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const total = getCart().reduce((s, i) => s + i.qty, 0);
  badge.textContent = total;
  badge.style.display = total ? 'flex' : 'none';
}

// ── Toast ────────────────────────────────────────────────────────
function showToast(msg, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : '✕'}</span> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ── Add to cart ──────────────────────────────────────────────────
function addToCart(productId) {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
  updateCartBadge();
  showToast(`"${product.name}" added to cart`);
}

// ── Confirm modal ────────────────────────────────────────────────
function confirmModal(message, onConfirm) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <h3>Confirm Action</h3>
      <p>${message}</p>
      <div class="modal-actions">
        <button class="btn btn-outline" id="modal-cancel">Cancel</button>
        <button class="btn btn-danger" id="modal-confirm">Delete</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('#modal-cancel').onclick = () => overlay.remove();
  overlay.querySelector('#modal-confirm').onclick = () => { overlay.remove(); onConfirm(); };
}

// ── Seed demo products ───────────────────────────────────────────
function seedProducts() {
  if (getProducts().length) return;
  const demo = [
    { id: 'p1', name: 'Wireless Headphones', category: 'Electronics', price: 79.99, stock: 15, description: 'Premium sound quality with active noise cancellation and 30-hour battery life.', image: 'https://picsum.photos/seed/headphones/400/300' },
    { id: 'p2', name: 'Running Sneakers', category: 'Footwear', price: 119.99, stock: 8, description: 'Lightweight and breathable running shoes with cushioned sole for maximum comfort.', image: 'https://picsum.photos/seed/sneakers/400/300' },
    { id: 'p3', name: 'Leather Wallet', category: 'Accessories', price: 34.99, stock: 25, description: 'Slim genuine leather wallet with RFID blocking and multiple card slots.', image: 'https://picsum.photos/seed/wallet/400/300' },
    { id: 'p4', name: 'Smart Watch', category: 'Electronics', price: 199.99, stock: 5, description: 'Feature-packed smartwatch with health tracking, GPS, and 7-day battery.', image: 'https://picsum.photos/seed/smartwatch/400/300' },
    { id: 'p5', name: 'Denim Jacket', category: 'Clothing', price: 64.99, stock: 12, description: 'Classic denim jacket with a modern slim fit. Perfect for casual outings.', image: 'https://picsum.photos/seed/jacket/400/300' },
    { id: 'p6', name: 'Coffee Maker', category: 'Home', price: 89.99, stock: 7, description: 'Programmable 12-cup coffee maker with built-in grinder and thermal carafe.', image: 'https://picsum.photos/seed/coffee/400/300' },
    { id: 'p7', name: 'Yoga Mat', category: 'Sports', price: 29.99, stock: 20, description: 'Non-slip eco-friendly yoga mat with alignment lines and carrying strap.', image: 'https://picsum.photos/seed/yogamat/400/300' },
    { id: 'p8', name: 'Sunglasses', category: 'Accessories', price: 49.99, stock: 18, description: 'UV400 polarized sunglasses with lightweight titanium frame.', image: 'https://picsum.photos/seed/sunglasses/400/300' },
  ];
  saveProducts(demo);
}

// ── Nav active link ──────────────────────────────────────────────
function setActiveNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    a.classList.toggle('active', href === path);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  seedProducts();
  updateCartBadge();
  setActiveNav();
});
