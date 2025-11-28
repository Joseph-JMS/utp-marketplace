import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const userId = session.user.id;
    const { items } = await req.json();

    if (!items || !items.length) {
      return NextResponse.json({ error: "Carrito vacío" }, { status: 400 });
    }

    // Validar stock
    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.id } });
      if (!product) {
        return NextResponse.json({ error: `Producto ${item.title} no encontrado` }, { status: 404 });
      }
      if (item.quantity > product.stock) {
        return NextResponse.json({ error: `Stock insuficiente de ${product.title}` }, { status: 400 });
      }
    }

    // Crear orden y items dentro de una transacción
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId,
          total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        },
      });

      for (const item of items) {
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          },
        });

        // Reducir stock
        await tx.product.update({
          where: { id: item.id },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return newOrder;
    });

    return NextResponse.json({ id: order.id });
  } catch (error) {
    console.error("ORDER ERROR:", error);
    return NextResponse.json({ error: "Error creando la orden" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      include: {
        user: true,
        items: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (err) {
    console.error("ORDER GET ERROR:", err);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}