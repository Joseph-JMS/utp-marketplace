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

      <div className="p-5 border rounded shadow-sm bg-light detail-wrapper">
        <div className="row g-5">

          <div className="col-md-6 text-center d-flex justify-content-center align-items-center">
            <img
              src={product.image || "/placeholder.png"}
              alt={product.title}
              className="img-fluid rounded"
              style={{ maxHeight: "420px", objectFit: "cover" }}
            />
          </div>

          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h2 className="fw-bold mb-3">{product.title}</h2>

            <p className="text-secondary mb-4" style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
              {product.description}
            </p>

            <h4 className="text-primary fw-bold mb-4" style={{ fontSize: "1.6rem" }}>
              S/. {product.price.toFixed(2)}
            </h4>

            <button
              className="btn btn-success btn-lg px-4"
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

    </div>
  );
}