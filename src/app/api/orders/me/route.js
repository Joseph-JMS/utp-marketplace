import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    console.log("Entro a /api/orders/me");
    console.log("SESSION:", session);

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    console.log("ORDERS ENCONTRADOS:", orders.length);

    const response = orders.map((o) => ({
      id: o.id,
      total: o.total,
      createdAt: o.createdAt,
      items: o.items.map((i) => ({
        id: i.id,
        quantity: i.quantity,
        price: i.price,
        product: i.product,
      })),
    }));

    return NextResponse.json(response);
  } catch (error) {
    console.error("ERROR EN /api/orders/me:", error);
    return NextResponse.json(
      { error: "Error obteniendo pedidos" },
      { status: 500 }
    );
  }
}