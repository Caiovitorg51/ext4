import { INDICATORS } from "@/lib/indicators";
import { prisma } from "@/lib/db";
import { getSessionId } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ n: string }> }
) {
  const sessionId = await getSessionId();
  if (!sessionId) {
    return NextResponse.json({ error: "Sessão não encontrada" }, { status: 401 });
  }

  const { n } = await params;
  const screenNumber = parseInt(n, 10);
  if (isNaN(screenNumber) || screenNumber < 1 || screenNumber > 5) {
    return NextResponse.json({ error: "Tela inválida" }, { status: 400 });
  }

  const scenario = await prisma.phishingScenario.findUnique({
    where: { id: screenNumber },
  });

  if (!scenario) {
    return NextResponse.json({ error: "Cenário não encontrado" }, { status: 404 });
  }

  const session = await prisma.gameSession.findUnique({
    where: { id: sessionId },
    include: { player: true },
  });

  if (!session) {
    return NextResponse.json({ error: "Sessão inválida" }, { status: 401 });
  }

  return NextResponse.json({
    screenNumber,
    totalScreens: 5,
    title: scenario.title,
    imagePath: scenario.imagePath,
    playerName: session.player.name,
    indicators: INDICATORS.map(({ id, label, description }) => ({
      id,
      label,
      description,
    })),
  });
}
