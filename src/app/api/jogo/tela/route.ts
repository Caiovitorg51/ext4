import { prisma } from "@/lib/db";
import { calculateScreenScore } from "@/lib/scoring";
import { getSessionId } from "@/lib/session";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  screenNumber: z.number().int().min(1).max(5),
  selectedIndicators: z.array(z.string()),
  timeSpentSeconds: z.number().int().min(0).optional(),
});

export async function POST(request: Request) {
  const sessionId = await getSessionId();
  if (!sessionId) {
    return NextResponse.json({ error: "Sessão não encontrada" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { screenNumber, selectedIndicators, timeSpentSeconds } =
      schema.parse(body);

    const scenario = await prisma.phishingScenario.findUnique({
      where: { id: screenNumber },
    });

    if (!scenario) {
      return NextResponse.json({ error: "Cenário não encontrado" }, { status: 404 });
    }

    const score = calculateScreenScore(
      selectedIndicators,
      scenario.correctIndicatorIds
    );

    await prisma.screenAttempt.upsert({
      where: {
        sessionId_screenNumber: { sessionId, screenNumber },
      },
      create: {
        sessionId,
        screenNumber,
        selectedIndicators,
        correctCount: score.correctCount,
        totalCorrect: score.totalCorrect,
        scorePercent: score.scorePercent,
        timeSpentSeconds,
      },
      update: {
        selectedIndicators,
        correctCount: score.correctCount,
        totalCorrect: score.totalCorrect,
        scorePercent: score.scorePercent,
        timeSpentSeconds,
        submittedAt: new Date(),
      },
    });

    return NextResponse.json({
      screenNumber,
      scorePercent: Math.round(score.scorePercent * 100),
      correctCount: score.correctCount,
      totalCorrect: score.totalCorrect,
      isComplete: screenNumber === 5,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Erro ao salvar tela" }, { status: 500 });
  }
}
