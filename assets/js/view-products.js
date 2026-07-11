function renderStats() {
  const products = getProducts();
  const totalValue = products.reduce((s, p) => s + p.price * p.stock, 0);
  const cats = new Set(products.map(p => p.category)).size;
  document.getElementById('stats-bar').innerHTML = `
    <div class="stat-card"><div class="stat-label">Total Products</div><div class="stat-value">${products.length}</div></div>
    <div class="stat-card"><div class="stat-label">Categories</div><div class="stat-value">${cats}</div></div>
    <div class="stat-card"><div class="stat-label">Inventory Value</div><div class="stat-value">$${totalValue.toFixed(0)}</div></div>
    <div class="stat-card"><div class="stat-label">Low Stock (≤5)</div><div class="stat-value">${products.filter(p => p.stock <= 5).length}</div></div>
  `;
}

function renderTable() {
  const products = getProducts();
  const search = document.getElementById('search').value.toLowerCase();
  const category = document.getElementById('filter-category').value;
  const sort = document.getElementById('sort').value;

  const catSelect = document.getElementById('filter-category');
  const cats = [...new Set(products.map(p => p.category))];
  const current = catSelect.value;
  catSelect.innerHTML = '<option value="">All Categories</option>' +
    cats.map(c => `<option value="${c}" ${c === current ? 'selected' : ''}>${c}</option>`).join('');

  let filtered = products.filter(p => {
    return (!search || p.name.toLowerCase().includes(search) || p.category.toLowerCase().includes(search))
      && (!category || p.category === category);
  });

  if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (sort === 'name-asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === 'name-desc') filtered.sort((a, b) => b.name.localeCompare(a.name));

  document.getElementById('product-count').textContent = `Showing ${filtered.length} of ${products.length} products`;

  const tbody = document.getElementById('products-table');
  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="6"><div class="empty-state"><div class="empty-icon">📦</div><h3>No products found</h3></div></td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(p => `
    <tr>
      <td><img src="${p.image}" alt="${p.name}" class="product-thumb" onerror="this.src='https://picsum.photos/48/48?random=${p.id}'" /></td>
      <td><strong>${p.name}</strong><br/><small style="color:var(--muted)">${p.description.substring(0, 50)}...</small></td>
      <td><span class="badge badge-blue">${p.category}</span></td>
      <td><strong>$${parseFloat(p.price).toFixed(2)}</strong></td>
      <td><span class="badge ${p.stock <= 5 ? 'badge-orange' : 'badge-green'}">${p.stock} in stock</span></td>
      <td>
        <div style="display:flex;gap:.4rem;flex-wrap:wrap">
          <a href="single-product.html?id=${p.id}" class="btn btn-outline btn-sm">👁</a>
          <a href="add-product.html?edit=${p.id}" class="btn btn-primary btn-sm">✏️</a>
          <button class="btn btn-danger btn-sm" onclick="deleteProduct('${p.id}')">🗑</button>
          <button class="btn btn-success btn-sm" onclick="addToCart('${p.id}')">🛒</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function deleteProduct(id) {
  const product = getProducts().find(p => p.id === id);
  confirmModal(`Are you sure you want to delete "<strong>${product.name}</strong>"? This cannot be undone.`, () => {
    const products = getProducts().filter(p => p.id !== id);
    saveProducts(products);
    // also remove from cart
    const cart = getCart().filter(i => i.id !== id);
    saveCart(cart);
    showToast('Product deleted', 'error');
    renderStats();
    renderTable();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderStats();
  renderTable();
  document.getElementById('search').addEventListener('input', renderTable);
  document.getElementById('filter-category').addEventListener('change', renderTable);
  document.getElementById('sort').addEventListener('change', renderTable);
});
