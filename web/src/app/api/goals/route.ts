import { NextRequest, NextResponse } from "next/server";
import { goalsStore } from "@/lib/goals-store";

export async function GET() {
  return NextResponse.json({ data: goalsStore.list() });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, target, saved, targetDate } = body ?? {};
  if (!title || !target) {
    return NextResponse.json({ error: "title and target are required." }, { status: 400 });
  }
  const created = goalsStore.create({
    title: String(title),
    target: Number(target),
    saved: Number(saved ?? 0),
    targetDate,
  });
  return NextResponse.json({ data: created }, { status: 201 });
}
