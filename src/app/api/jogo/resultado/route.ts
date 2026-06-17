import { getIndicatorLabels } from "@/lib/indicators";
import { prisma } from "@/lib/db";
import { calculateGlobalScore } from "@/lib/scoring";
import { getSessionId } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  const sessionId = await getSessionId();
  if (!sessionId) {
    return NextResponse.json({ error: "Sessão não encontrada" }, { status: 401 });
  }

  const session = await prisma.gameSession.findUnique({
    where: { id: sessionId },
    include: {
      player: true,
      attempts: { orderBy: { screenNumber: "asc" } },
    },
  });

  if (!session) {
    return NextResponse.json({ error: "Sessão inválida" }, { status: 401 });
  }

  if (session.attempts.length < 5) {
    return NextResponse.json(
      { error: "Complete todas as 5 telas antes de ver o resultado" },
      { status: 400 }
    );
  }

  const scenarios = await prisma.phishingScenario.findMany({
    orderBy: { id: "asc" },
  });

  const globalScore = calculateGlobalScore(
    session.attempts.map((a) => a.scorePercent)
  );

  const totalTimeSeconds = session.attempts.reduce(
    (sum, a) => sum + (a.timeSpentSeconds ?? 0),
    0
  );

  await prisma.gameSession.update({
    where: { id: sessionId },
    data: { completedAt: new Date() },
  });

  const screens = session.attempts.map((attempt) => {
    const scenario = scenarios.find((s) => s.id === attempt.screenNumber)!;
    const correctSet = new Set(scenario.correctIndicatorIds);
    const selectedSet = new Set(attempt.selectedIndicators);

    const hit = scenario.correctIndicatorIds.filter((id) =>
      selectedSet.has(id)
    );
    const missed = scenario.correctIndicatorIds.filter(
      (id) => !selectedSet.has(id)
    );
    const falsePositives = attempt.selectedIndicators.filter(
      (id) => !correctSet.has(id)
    );

    return {
      screenNumber: attempt.screenNumber,
      title: scenario.title,
      scorePercent: Math.round(attempt.scorePercent * 100),
      hint: scenario.hint,
      hit: getIndicatorLabels(hit),
      missed: getIndicatorLabels(missed),
      falsePositives: getIndicatorLabels(falsePositives),
    };
  });

  return NextResponse.json({
    playerName: session.player.name,
    globalScore,
    totalTimeSeconds,
    screens,
  });
}
