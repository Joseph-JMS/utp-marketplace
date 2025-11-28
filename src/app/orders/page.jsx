"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function UserOrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    fetch("/api/orders/me")
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, [session]);

  if (!session) return <p className="container my-5">Debes iniciar sesión para ver tus pedidos.</p>;
  if (loading) return <p className="container my-5">Cargando tus pedidos...</p>;
  if (!orders.length) return <p className="container my-5">No tienes pedidos aún.</p>;

  return (
    <div className="container my-5">
      <h2 className="mb-4">Mis Pedidos</h2>
      {orders.map(order => (
        <div key={order.id} className="card mb-3 shadow-sm">
          <div className="card-header">
            Pedido #{order.id} — Total: S/.{order.total.toFixed(2)}
          </div>
          <div className="card-body">
            <h6>Productos:</h6>
            <ul>
              {order.items.map(item => (
                <li key={item.id}>
                  {item.quantity} x {item.product.title} - S/.{(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="text-muted">Fecha: {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}