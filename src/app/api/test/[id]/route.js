import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    console.log("Params recibidos:", params);
    return NextResponse.json({ params });
  } catch (err) {
    console.error("Error en test route:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}