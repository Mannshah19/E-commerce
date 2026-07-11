const params = new URLSearchParams(location.search);
const editId = params.get('edit');

document.addEventListener('DOMContentLoaded', () => {
  if (editId) {
    const product = getProducts().find(p => p.id === editId);
    if (product) {
      document.getElementById('form-title').textContent = '✏️ Edit Product';
      document.getElementById('submit-btn').textContent = '✓ Update Product';
      document.getElementById('name').value = product.name;
      document.getElementById('price').value = product.price;
      document.getElementById('stock').value = product.stock;
      document.getElementById('category').value = product.category;
      document.getElementById('description').value = product.description;
      document.getElementById('image').value = product.image;
    }
  }

  document.getElementById('product-form').addEventListener('submit', e => {
    e.preventDefault();
    const products = getProducts();
    const data = {
      name: document.getElementById('name').value.trim(),
      price: parseFloat(document.getElementById('price').value),
      stock: parseInt(document.getElementById('stock').value),
      category: document.getElementById('category').value,
      description: document.getElementById('description').value.trim(),
      image: document.getElementById('image').value.trim() ||
        `https://picsum.photos/seed/${Date.now()}/400/300`,
    };

    if (editId) {
      const idx = products.findIndex(p => p.id === editId);
      products[idx] = { ...products[idx], ...data };
      saveProducts(products);
      showToast('Product updated successfully');
    } else {
      data.id = 'p' + Date.now();
      products.push(data);
      saveProducts(products);
      showToast('Product added successfully');
      e.target.reset();
    }

    setTimeout(() => location.href = 'view-products.html', 800);
  });
});
