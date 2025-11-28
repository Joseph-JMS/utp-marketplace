"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Usuario creado correctamente");
      router.push("/login");
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Registrar Usuario</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Correo"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Registrar
          </button>
        </form>
        {error && <div className="text-danger text-center">{error}</div>}
        <p className="text-center mt-3">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}