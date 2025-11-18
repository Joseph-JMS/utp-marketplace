export const getCart = () => JSON.parse(localStorage.getItem("cart") || "[]");

export const getCartCount = () => getCart().reduce((acc, item) => acc + item.quantity, 0);

export const addToCart = product => {
  const cart = getCart();
  const existing = cart.find(p => p.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const removeFromCart = id => {
  const cart = getCart().filter(p => p.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const updateCartQuantity = (id, quantity) => {
  const cart = getCart();
  const item = cart.find(p => p.id === id);
  if (item) item.quantity = quantity;
  localStorage.setItem("cart", JSON.stringify(cart));
};