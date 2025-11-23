"use client";
import { useEffect, useState } from "react";

export default function ProductsAdminPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(""); 
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: 1,
    image: "",
    category: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInput = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    const url = editingId
      ? `/api/products/${editingId}`
      : "/api/products";
    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    resetForm();
    fetchProducts();
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      price: "",
      stock: 1,
      image: "",
      category: "",
    });
    setEditingId(null);
  };

  const handleEdit = product => {
    setForm({
      title: product.title,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: product.image || "",
      category: product.category || "",
    });
    setEditingId(product.id);
  };

  const handleDelete = async id => {
    if (!confirm("¿Seguro que quieres eliminar este producto?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  // Filtros de busqueda
  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-wrapper">

      {/* Formulario para productos */}
      <div className="admin-form">
        <h4>{editingId ? "Editar Producto" : "Registrar Producto"}</h4>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Nombre del producto"
            value={form.title}
            onChange={handleInput}
          />

          <textarea
            name="description"
            className="form-control"
            placeholder="Descripción"
            value={form.description}
            onChange={handleInput}
          ></textarea>

          <input
            type="number"
            name="price"
            className="form-control"
            placeholder="Precio"
            value={form.price}
            onChange={handleInput}
          />

          <input
            type="number"
            name="stock"
            className="form-control"
            placeholder="Stock"
            min="1"
            value={form.stock}
            onChange={handleInput}
          />

          <input
            type="text"
            name="image"
            className="form-control"
            placeholder="URL de imagen"
            value={form.image}
            onChange={handleInput}
          />

          <input
            type="text"
            name="category"
            className="form-control"
            placeholder="Categoría"
            value={form.category}
            onChange={handleInput}
          />

          <button type="submit" className="btn btn-primary w-100">
            {editingId ? "Guardar Cambios" : "Registrar"}
          </button>

          {editingId && (
            <button
              type="button"
              className="btn btn-secondary w-100 mt-2"
              onClick={resetForm}
            >
              Cancelar edición
            </button>
          )}
        </form>
      </div>

      {/* tabla de productos */}
      <div className="admin-table-card">
        <div className="admin-search-row">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="btn btn-outline-secondary">
            Buscar
          </button>
        </div>

        <div className="modulo-table">
          <table>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Quiero</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.image ? (
                      <img src={p.image} className="thumb" />
                    ) : (
                      <img src="/placeholder.png" className="thumb" />
                    )}
                  </td>

                  <td>{p.title}</td>

                  <td>S/ {p.price}</td>

                  <td>{p.category || "—"}</td>

                  <td>{p.stock}</td>

                  <td className="actions">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(p)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(p.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}