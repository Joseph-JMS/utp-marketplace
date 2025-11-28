"use client";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function ProductCard({ product }) {
  const addToCart = useCartStore(state => state.addToCart);

  return (
    <div className="card h-100 shadow-sm product-card">
      <img
        src={product.image || "/placeholder.png"}
        className="card-img-top"
        alt={product.title}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text text-secondary">{product.description}</p>
        <h6 className="mt-auto text-primary">S/.{product.price}</h6>
        
        <Link
          href={`/products/${product.id}`}
          className="btn btn-primary mt-2"
        >
          Ver detalle
        </Link>

        <button
          className="btn btn-success mt-2"
          onClick={() => addToCart({ ...product, quantity: 1 })}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}