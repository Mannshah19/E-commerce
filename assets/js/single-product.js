document.addEventListener('DOMContentLoaded', () => {
  const id = new URLSearchParams(location.search).get('id');
  const product = getProducts().find(p => p.id === id);
  const container = document.getElementById('product-detail');

  if (!product) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">😕</div><h3>Product not found</h3><a href="index.html" class="btn btn-primary" style="margin-top:1rem">Go Home</a></div>`;
    return;
  }

  document.title = `ShopEase – ${product.name}`;

  // Related products
  const related = getProducts().filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  container.innerHTML = `
    <div class="single-layout">
      <div class="single-img">
        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://picsum.photos/600/420?random=${product.id}'" />
      </div>
      <div class="single-info">
        <div class="single-category">${product.category}</div>
        <div class="single-name">${product.name}</div>
        <div class="single-price">$${parseFloat(product.price).toFixed(2)}</div>
        <div class="single-desc">${product.description}</div>
        <div class="single-meta">
          <div class="single-meta-row">
            <span>Stock</span>
            <span><span class="badge ${product.stock <= 5 ? 'badge-orange' : 'badge-green'}">${product.stock} available</span></span>
          </div>
          <div class="single-meta-row">
            <span>Category</span>
            <span><span class="badge badge-blue">${product.category}</span></span>
          </div>
          <div class="single-meta-row">
            <span>ID</span>
            <span style="color:var(--muted);font-size:.85rem">${product.id}</span>
          </div>
        </div>
        <div class="single-actions">
          <button class="btn btn-primary" onclick="addToCart('${product.id}')">🛒 Add to Cart</button>
          <a href="add-product.html?edit=${product.id}" class="btn btn-outline">✏️ Edit</a>
          <button class="btn btn-danger" onclick="deleteSingle('${product.id}')">🗑 Delete</button>
        </div>
      </div>
    </div>

    ${related.length ? `
      <div style="margin-top:3rem">
        <div class="page-title" style="margin-bottom:1rem;font-size:1.2rem">Related Products</div>
        <div class="products-grid">
          ${related.map(p => `
            <div class="product-card">
              <img src="${p.image}" alt="${p.name}" onerror="this.src='https://picsum.photos/400/300?random=${p.id}'" />
              <div class="product-card-body">
                <div class="product-card-category">${p.category}</div>
                <div class="product-card-name">${p.name}</div>
                <div class="product-card-price">$${parseFloat(p.price).toFixed(2)}</div>
              </div>
              <div class="product-card-footer">
                <a href="single-product.html?id=${p.id}" class="btn btn-outline btn-sm">👁 View</a>
                <button class="btn btn-primary btn-sm" onclick="addToCart('${p.id}')">🛒 Add</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}
  `;
});

function deleteSingle(id) {
  const product = getProducts().find(p => p.id === id);
  confirmModal(`Delete "<strong>${product.name}</strong>"?`, () => {
    saveProducts(getProducts().filter(p => p.id !== id));
    saveCart(getCart().filter(i => i.id !== id));
    showToast('Product deleted', 'error');
    setTimeout(() => location.href = 'index.html', 800);
  });
}
