import { NextRequest, NextResponse } from "next/server";
import { categoriesStore } from "@/lib/categories-store";

export async function GET() {
  return NextResponse.json({ data: categoriesStore.list() });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, type } = body ?? {};
  if (!name) {
    return NextResponse.json({ error: "name is required." }, { status: 400 });
  }
  const created = categoriesStore.create({
    name: String(name).toLowerCase(),
    type: type ?? "expense",
  });
  return NextResponse.json({ data: created }, { status: 201 });
}
