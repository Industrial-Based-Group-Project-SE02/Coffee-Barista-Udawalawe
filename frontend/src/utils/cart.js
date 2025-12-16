export function getCart() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

export function removeFromCart(id) {
  const cart = getCart().filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
}
