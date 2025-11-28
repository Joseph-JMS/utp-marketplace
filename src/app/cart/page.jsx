"use client";
import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, loadCart, removeFromCart, updateQuantity, getTotal, clearCart } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    loadCart();
  }, []);

  const handleCheckout = async () => {
    if (!session) {
      // Si no hay sesión, redirigir al login
      router.push("/login");
      return;
    }

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(`Orden creada correctamente! ID: ${data.id}`);
      clearCart();
    } else {
      alert(data.error);
    }
  };

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
                  value={item.quantity ?? 1}
                  onChange={e => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                  className="form-control"
                  style={{ width: "80px" }}
                />
              </td>
              <td>S/.{(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4 className="mt-3">Total: S/.{getTotal().toFixed(2)}</h4>
      <div className="mt-3">
        <Link href="/products" className="btn btn-secondary me-2">Seguir comprando</Link>
        <button onClick={handleCheckout} className="btn btn-success">Finalizar Compra</button>
      </div>
    </div>
  );
}