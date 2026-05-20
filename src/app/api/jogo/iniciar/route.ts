import { prisma } from "@/lib/db";
import { SESSION_COOKIE } from "@/lib/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(24, "Nome deve ter no máximo 24 caracteres"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = schema.parse(body);

    const player = await prisma.player.create({
      data: { name },
    });

    const session = await prisma.gameSession.create({
      data: { playerId: player.id },
    });

    const store = await cookies();
    store.set(SESSION_COOKIE, session.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 4,
      path: "/",
    });

    return NextResponse.json({
      sessionId: session.id,
      playerName: player.name,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? "Dados inválidos" },
        { status: 400 }
      );
    }
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao iniciar sessão" },
      { status: 500 }
    );
  }
}
