import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],
    // Inicializa desde localStorage
    loadCart: () => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]").map(item => ({
        ...item,
        quantity: item.quantity ?? 1, // inicializa quantity si no existe
    }));
    set({ cart: stored });
    },
  addToCart: (product) => {
    const cart = [...get().cart];
    const existing = cart.find(p => p.id === product.id);
    if (existing) existing.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    set({ cart });
    localStorage.setItem("cart", JSON.stringify(cart));
  },
  removeFromCart: (id) => {
    const cart = get().cart.filter(p => p.id !== id);
    set({ cart });
    localStorage.setItem("cart", JSON.stringify(cart));
  },
  updateQuantity: (id, quantity) => {
    const cart = get().cart.map(p => p.id === id ? { ...p, quantity } : p);
    set({ cart });
    localStorage.setItem("cart", JSON.stringify(cart));
  },
  clearCart: () => {
    set({ cart: [] });
    localStorage.removeItem("cart");
  },
  getTotal: () => get().cart.reduce((sum, p) => sum + p.price * p.quantity, 0),
}));