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
        name: data.title,
        description: data.description,
        price: data.price,
        image: data.image || "",
      },
    });
    return NextResponse.json(newProduct);
  } catch (error) {
    return NextResponse.error();
  }
}