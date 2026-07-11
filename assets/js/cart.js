function renderCart() {
  const cart = getCart();
  updateCartBadge();
  document.getElementById('cart-count').textContent =
    cart.length ? `${cart.reduce((s, i) => s + i.qty, 0)} item(s) in your cart` : 'Your cart is empty';

  const content = document.getElementById('cart-content');
  if (!cart.length) {
    content.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add some products to get started</p>
        <a href="index.html" class="btn btn-primary" style="margin-top:1rem">Browse Products</a>
      </div>`;
    return;
  }

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  content.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">
        ${cart.map(item => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='https://picsum.photos/72/72?random=${item.id}'" />
            <div class="cart-item-info">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-cat">${item.category}</div>
              <div class="cart-item-price">$${parseFloat(item.price).toFixed(2)} each</div>
            </div>
            <div class="qty-control">
              <button class="qty-btn" onclick="changeQty('${item.id}', -1)">−</button>
              <span class="qty-val">${item.qty}</span>
              <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
            </div>
            <div class="cart-item-total">$${(item.price * item.qty).toFixed(2)}</div>
            <button class="btn-icon" onclick="removeItem('${item.id}')" title="Remove">🗑</button>
          </div>
        `).join('')}
      </div>
      <div class="cart-summary">
        <div class="summary-title">Order Summary</div>
        <div class="summary-row"><span>Subtotal (${cart.reduce((s,i)=>s+i.qty,0)} items)</span><span>$${subtotal.toFixed(2)}</span></div>
        <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? '<span style="color:var(--success)">FREE</span>' : '$' + shipping.toFixed(2)}</span></div>
        <div class="summary-row"><span>Tax (8%)</span><span>$${tax.toFixed(2)}</span></div>
        <div class="summary-row total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
        ${subtotal <= 100 ? `<p style="font-size:.78rem;color:var(--muted);margin-bottom:1rem">Add $${(100-subtotal).toFixed(2)} more for free shipping!</p>` : ''}
        <button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:.5rem" onclick="checkout()">Checkout →</button>
        <button class="btn btn-danger" style="width:100%;justify-content:center;margin-top:.5rem" onclick="clearCart()">🗑 Clear Cart</button>
      </div>
    </div>`;
}

function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    saveCart(cart.filter(i => i.id !== id));
  } else {
    saveCart(cart);
  }
  renderCart();
}

function removeItem(id) {
  saveCart(getCart().filter(i => i.id !== id));
  showToast('Item removed from cart', 'error');
  renderCart();
}

function clearCart() {
  confirmModal('Remove all items from your cart?', () => {
    saveCart([]);
    showToast('Cart cleared', 'error');
    renderCart();
  });
}

function checkout() {
  confirmModal('Proceed to checkout? (Demo only)', () => {
    saveCart([]);
    showToast('Order placed successfully! 🎉');
    renderCart();
  });
}

document.addEventListener('DOMContentLoaded', renderCart);
