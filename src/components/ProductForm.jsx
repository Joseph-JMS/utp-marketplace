"use client";
import { useState } from "react";

export default function ProductForm({ onSubmit, initialData }) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    stock: initialData?.stock || 1,
    category: initialData?.category || "",
    image: initialData?.image || ""
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm bg-light">
      <div className="mb-3">
        <label className="form-label">Título</label>
        <input type="text" name="title" className="form-control" value={form.title} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea name="description" className="form-control" value={form.description} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Precio</label>
        <input type="number" step="0.01" name="price" className="form-control" value={form.price} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Stock</label>
        <input type="number" name="stock" className="form-control" value={form.stock} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Categoría</label>
        <input type="text" name="category" className="form-control" value={form.category} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Imagen (URL)</label>
        <input type="text" name="image" className="form-control" value={form.image} onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-success">Guardar</button>
    </form>
  );
}