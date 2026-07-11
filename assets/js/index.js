function renderProducts() {
  const products = getProducts();
  const search = document.getElementById('search').value.toLowerCase();
  const category = document.getElementById('filter-category').value;
  const sort = document.getElementById('sort').value;

  // Populate categories
  const catSelect = document.getElementById('filter-category');
  const cats = [...new Set(products.map(p => p.category))];
  const current = catSelect.value;
  catSelect.innerHTML = '<option value="">All Categories</option>' +
    cats.map(c => `<option value="${c}" ${c === current ? 'selected' : ''}>${c}</option>`).join('');

  let filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search);
    const matchCat = !category || p.category === category;
    return matchSearch && matchCat;
  });

  if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (sort === 'name-asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === 'name-desc') filtered.sort((a, b) => b.name.localeCompare(a.name));

  document.getElementById('product-count').textContent = `${filtered.length} product${filtered.length !== 1 ? 's' : ''} found`;

  const grid = document.getElementById('products-grid');
  if (!filtered.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">🔍</div><h3>No products found</h3><p>Try adjusting your search or filters</p></div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}" onerror="this.src='https://picsum.photos/400/300?random=${p.id}'" />
      <div class="product-card-body">
        <div class="product-card-category">${p.category}</div>
        <div class="product-card-name">${p.name}</div>
        <div class="product-card-desc">${p.description}</div>
        <div class="product-card-price">$${parseFloat(p.price).toFixed(2)}</div>
      </div>
      <div class="product-card-footer">
        <a href="single-product.html?id=${p.id}" class="btn btn-outline btn-sm">👁 View</a>
        <button class="btn btn-primary btn-sm" onclick="addToCart('${p.id}')">🛒 Add</button>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  document.getElementById('search').addEventListener('input', renderProducts);
  document.getElementById('filter-category').addEventListener('change', renderProducts);
  document.getElementById('sort').addEventListener('change', renderProducts);
});
