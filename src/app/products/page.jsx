"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");   // <-- Categoría seleccionada
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    const query = search.toLowerCase();

    const result = products.filter(p => {
      const matchesText =
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query);

      const matchesCategory =
        category === "Todos" || p.category === category;

      return matchesText && matchesCategory;
    });

    setFiltered(result);
  }, [search, category, products]);

  return (
    <div className="container my-5 fade-in">
      <h2 className="mb-4">Catálogo de Productos</h2>

      <div className="row mb-4">
        <div className="col-md-8">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="form-control"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: "12px", fontSize: "1.1rem" }}
          />
        </div>

        <div className="col-md-4 mt-3 mt-md-0">
          <select
            className="form-control"
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{ padding: "12px", fontSize: "1.1rem" }}
          >
            <option value="Todos">Todas las categorías</option>
            <option value="Accesorios">Accesorios</option>
            <option value="Proyectos">Proyectos</option>
            <option value="Servicios">Servicios</option>
            <option value="Libros">Libros</option>
          </select>
        </div>
      </div>

      {/* Productos */}
      <div className="row g-4">
        {filtered.length > 0 ? (
          filtered.map(product => (
            <div key={product.id} className="col-12 col-md-6 col-lg-4">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p className="text-center text-secondary">
            No se encontraron productos.
          </p>
        )}
      </div>
    </div>
  );
}