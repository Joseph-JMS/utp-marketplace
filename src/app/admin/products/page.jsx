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
    imageFile: null,
  });
  const [editingId, setEditingId] = useState(null);

  // NUEVO: estado de errores
  const [errors, setErrors] = useState({});

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // VALIDACIONES POR CAMPO ---------------------
  const validateField = (name, value) => {
    let msg = "";

    if (name === "title" && value.trim() === "") {
      msg = "El nombre es obligatorio.";
    }

    if (name === "description" && value.trim() === "") {
      msg = "La descripción es obligatoria.";
    }

    if (name === "price") {
      if (value === "" || parseFloat(value) <= 0)
        msg = "El precio debe ser mayor a 0.";
    }

    if (name === "stock") {
      if (value === "" || parseInt(value) < 1)
        msg = "El stock mínimo es 1.";
    }

    if (name === "category" && value.trim() === "") {
      msg = "Debe seleccionar una categoría.";
    }

    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  // -------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = form.image;

    if (form.imageFile) {
      const fd = new FormData();
      fd.append("file", form.imageFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

      const uploadData = await uploadRes.json();
      imageUrl = uploadData.url;
    }

    const url = editingId
      ? `/api/products/${editingId}`
      : "/api/products";

    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        image: imageUrl,
      }),
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
      imageFile: null,
      category: "",
    });
    setErrors({});
    setEditingId(null);
  };

  const handleEdit = (product) => {
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

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar este producto?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
  );

  // Validaciones antes de habilitar botón
  const isFormValid =
    Object.values(errors).every((e) => e === "") &&
    form.title.trim() !== "" &&
    form.description.trim() !== "" &&
    form.price !== "" &&
    form.stock > 0 &&
    form.category.trim() !== "";

  return (
    <div className="admin-wrapper">
      <div className="admin-form">
        <h4>{editingId ? "Editar Producto" : "Registrar Producto"}</h4>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            placeholder="Nombre del producto"
            value={form.title}
            onChange={handleInput}
            onBlur={handleBlur}
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}

          <textarea
            name="description"
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            placeholder="Descripción"
            value={form.description}
            onChange={handleInput}
            onBlur={handleBlur}
          ></textarea>
          {errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}

          <input
            type="number"
            name="price"
            className={`form-control ${errors.price ? "is-invalid" : ""}`}
            placeholder="Precio"
            value={form.price}
            onChange={handleInput}
            onBlur={handleBlur}
          />
          {errors.price && (
            <div className="invalid-feedback">{errors.price}</div>
          )}

          <input
            type="number"
            name="stock"
            min="1"
            className={`form-control ${errors.stock ? "is-invalid" : ""}`}
            placeholder="Stock"
            value={form.stock}
            onChange={handleInput}
            onBlur={handleBlur}
          />
          {errors.stock && (
            <div className="invalid-feedback">{errors.stock}</div>
          )}

          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, imageFile: e.target.files[0] })
            }
          />

          <select
            name="category"
            className={`form-control ${errors.category ? "is-invalid" : ""}`}
            value={form.category}
            onChange={handleInput}
            onBlur={handleBlur}
          >
            <option value="">Seleccione categoría</option>
            <option value="Accesorios">Accesorios</option>
            <option value="Proyectos">Proyectos</option>
            <option value="Servicios">Servicios</option>
            <option value="Libros">Libros</option>
          </select>
          {errors.category && (
            <div className="invalid-feedback">{errors.category}</div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={!isFormValid}
          >
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