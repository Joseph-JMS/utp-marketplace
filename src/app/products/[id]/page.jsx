"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    console.log("Fetching product id:", id, "typeof id:", typeof id);
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("Product data:", data);
        setProduct(data);
      });
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
          <h4 className="text-primary">S/.{product.price}</h4>
          <button className="btn btn-success mt-3" onClick={() => addToCart(product)}>Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
}

// Función simple para carrito en localStorage
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Producto agregado al carrito");
}