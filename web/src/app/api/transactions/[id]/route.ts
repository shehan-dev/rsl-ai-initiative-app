import { NextRequest, NextResponse } from "next/server";
import { transactionsStore } from "@/lib/transactions-store";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const item = transactionsStore.getById(id);
  if (!item) {
    return NextResponse.json({ error: "Transaction not found." }, { status: 404 });
  }

  return NextResponse.json({ data: item });
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const body = await request.json();
  const updated = transactionsStore.update(id, body ?? {});

  if (!updated) {
    return NextResponse.json({ error: "Transaction not found." }, { status: 404 });
  }

  return NextResponse.json({ data: updated });
}

export async function DELETE(_: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const removed = transactionsStore.remove(id);
  if (!removed) {
    return NextResponse.json({ error: "Transaction not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
