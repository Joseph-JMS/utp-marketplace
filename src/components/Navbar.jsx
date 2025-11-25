"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(stored.length);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link href="/" className="navbar-brand">UTP Marketplace</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link href="/products" className="nav-link">Catálogo</Link>
            </li>
            <li className="nav-item">
              <Link href="/cart" className="nav-link">
                Carrito {cartCount > 0 && <span className="badge bg-light text-dark">{cartCount}</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link">Contacto</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}