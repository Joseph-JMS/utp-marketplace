"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProduct() {
  const [form, setForm] = useState({ name: "", description: "", price: "", image: "" });
  const router = useRouter();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    router.push("/products");
  };

  return (
    <div className="container my-5 fade-in">
      <h2 className="mb-4">Crear Producto</h2>
      <form className="p-4 border rounded shadow-sm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea name="description" className="form-control" rows="4" value={form.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input type="number" name="price" className="form-control" value={form.price} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">URL de Imagen</label>
          <input type="text" name="image" className="form-control" value={form.image} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Crear</button>
      </form>
    </div>
  );
}