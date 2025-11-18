"use client";
import { useEffect, useState } from "react";
import { getCart, removeFromCart, updateCartQuantity } from "@/utils/cart";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartFromStorage = getCart().map(item => ({
      ...item,
      quantity: item.quantity || 1, // inicializamos quantity si no existe
    }));
    setCart(cartFromStorage);
  }, []);

  const handleRemove = id => {
    removeFromCart(id);
    setCart(getCart().map(item => ({ ...item, quantity: item.quantity || 1 })));
  };

  const handleQuantityChange = (id, quantity) => {
    const qty = parseInt(quantity) || 1; // aseguramos número válido
    updateCartQuantity(id, qty);
    setCart(getCart().map(item => ({ ...item, quantity: item.quantity || 1 })));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0)
    return <div className="container my-5"><h2>Tu carrito está vacío</h2></div>;

  return (
    <div className="container my-5">
      <h2 className="mb-4">Carrito de Compras</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>S/.{item.price.toFixed(2)}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e => handleQuantityChange(item.id, e.target.value)}
                  className="form-control"
                  style={{ width: "80px" }}
                />
              </td>
              <td>S/.{(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemove(item.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4 className="mt-3">Total: S/.{total.toFixed(2)}</h4>
      <Link href="/" className="btn btn-success mt-3">Seguir comprando</Link>
    </div>
  );
}