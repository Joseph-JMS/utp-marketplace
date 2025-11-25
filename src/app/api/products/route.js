import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    console.log(products);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newProduct = await prisma.product.create({
      data: {
        title: data.title,
        description: data.description,
        price: parseFloat(data.price),
        stock: parseInt(data.stock) || 1,
        image: data.image || "",
        category: data.category || null,
      },
    });
    return NextResponse.json(newProduct);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al crear producto" }, { status: 500 });
  }
}