"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const addToCart = useCartStore(state => state.addToCart);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p>Cargando...</p>;

  return (
    <div className="container my-5 fade-in">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image || "/placeholder.png"}
            alt={product.title}
            className="img-fluid rounded shadow-sm"
          />
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p className="text-secondary">{product.description}</p>
          <h4 className="text-primary">S/.{product.price.toFixed(2)}</h4>

          <button
            className="btn btn-success mt-3"
            onClick={() => {
              addToCart({ ...product, quantity: 1 });
              alert("Producto agregado al carrito");
            }}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}