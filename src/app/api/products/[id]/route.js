import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/products/:id
export async function GET(request) {
  // Extraer id desde la URL
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop(); // toma el último segmento
  const productId = parseInt(id);

  if (isNaN(productId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// PUT /api/products/:id
export async function PUT(request, { params }) {
  const { id } = params;
  const productId = parseInt(id, 10);

  if (!id || isNaN(productId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const data = await request.json();

  try {
    const updated = await prisma.product.update({
      where: { id: productId },
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        image: data.image || "",
        stock: data.stock || 1,
        category: data.category || null,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return NextResponse.json({ error: "Error al actualizar el producto" }, { status: 500 });
  }
}

// DELETE /api/products/:id
export async function DELETE(request, { params }) {
  const { id } = params;
  const productId = parseInt(id, 10);

  if (!id || isNaN(productId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    await prisma.product.delete({ where: { id: productId } });
    return NextResponse.json({ message: "Producto eliminado" });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return NextResponse.json({ error: "Error al eliminar el producto" }, { status: 500 });
  }
}