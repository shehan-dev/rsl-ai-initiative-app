import { NextRequest, NextResponse } from "next/server";
import { transactionsStore } from "@/lib/transactions-store";

export async function GET() {
  return NextResponse.json({
    data: transactionsStore.list(),
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { amount, type, category, date, note } = body ?? {};

  if (!amount || !type || !category || !date) {
    return NextResponse.json(
      { error: "amount, type, category, and date are required." },
      { status: 400 },
    );
  }

  const created = transactionsStore.create({
    amount: Number(amount),
    type,
    category,
    date,
    note,
  });

  return NextResponse.json({ data: created }, { status: 201 });
}
