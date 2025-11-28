"use client";
import Link from "next/link";
import { useEffect, useState } from "react"; // <--- importante
import { useCartStore } from "@/store/cartStore";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [cartCount, setCartCount] = useState(0);
  const cart = useCartStore(state => state.cart);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    // cargar cart desde zustand/store
    setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
  }, [cart]); // se recalcula cuando cambia cart

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link href="/" className="navbar-brand">UTP Marketplace</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link href="/" className="nav-link">Inicio</Link></li>
            <li className="nav-item"><Link href="/products" className="nav-link">Catálogo</Link></li>
            <li className="nav-item">
              <Link href="/cart" className="nav-link">
                Carrito {cartCount > 0 && <span className="badge bg-warning text-dark">{cartCount}</span>}
              </Link>
            </li>
            <li className="nav-item"><Link href="/contact" className="nav-link">Contacto</Link></li>
            {session && (
              <li className="nav-item">
                <Link href="/orders" className="nav-link">Mis pedidos</Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {session?.user.role === "ADMIN" && (
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Admin
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link href="/admin/products" className="dropdown-item">
                    Gestionar Productos
                  </Link>
                </li>
                <li>
                  <Link href="/admin/orders" className="dropdown-item">
                    Ver Órdenes
                  </Link>
                </li>
              </ul>
            </li>
          )}
            {!session ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="accessDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Acceder
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="accessDropdown">
                  <li><Link className="dropdown-item" href="/login">Iniciar Sesión</Link></li>
                  <li><Link className="dropdown-item" href="/register">Registrarme</Link></li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item"><span className="nav-link">Hola, {session.user.name}</span></li>
                <li className="nav-item">
                  <button onClick={() => signOut({ callbackUrl: "/" })} className="btn btn-link nav-link">
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}