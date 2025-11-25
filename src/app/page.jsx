"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container home-full fade-in section-zoom">
      <div className="text-center mb-5">
        <h1 className="display-4">Bienvenido a UTP Marketplace</h1>
        <p className="lead">Compra, vende e intercambia productos y servicios dentro de la comunidad universitaria</p>
        <Link href="/products" className="btn btn-primary btn-lg mt-3 home-btn">
          Ver Productos
        </Link>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card p-3 text-center shadow-sm hover-effect">
            <h5>Libros</h5>
            <p>Compra y vende libros de tus cursos.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 text-center shadow-sm hover-effect">
            <h5>Accesorios</h5>
            <p>Encuentra accesorios útiles y gadgets.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 text-center shadow-sm hover-effect">
            <h5>Servicios</h5>
            <p>Ofrece o solicita servicios entre estudiantes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}