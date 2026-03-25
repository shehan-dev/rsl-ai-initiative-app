import { NextRequest, NextResponse } from "next/server";
import { categoriesStore } from "@/lib/categories-store";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const body = await request.json();
  const updated = categoriesStore.update(id, body ?? {});
  if (!updated) {
    return NextResponse.json({ error: "Category not found." }, { status: 404 });
  }
  return NextResponse.json({ data: updated });
}

export async function DELETE(_: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const removed = categoriesStore.remove(id);
  if (!removed) {
    return NextResponse.json({ error: "Category not found." }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
