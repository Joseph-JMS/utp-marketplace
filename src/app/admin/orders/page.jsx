"use client";
import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="container my-5">Cargando pedidos...</p>;

  return (
    <div className="container my-5">
      <h2>Pedidos de clientes</h2>
      {orders.length === 0 ? (
        <p>No hay pedidos todavía.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="card mb-3 shadow-sm">
            <div className="card-header">
              Pedido N.{order.id} - Cliente: {order.user.name} - Total: S/.{order.total.toFixed(2)}
            </div>
            <div className="card-body">
              {order.items.map(item => (
                <p key={item.id}>
                  {item.product.title} - Cantidad: {item.quantity} - Precio: S/.{item.price.toFixed(2)}
                </p>
              ))}
              <small className="text-muted">Fecha: {new Date(order.createdAt).toLocaleString()}</small>
            </div>
          </div>
        ))
      )}
    </div>
  );
}