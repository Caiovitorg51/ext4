import { GameScreen } from "@/components/game-screen";
import { INDICATORS } from "@/lib/indicators";
import { prisma } from "@/lib/db";
import { getSessionId } from "@/lib/session";
import { redirect } from "next/navigation";

type Props = { params: Promise<{ tela: string }> };

export default async function JogoTelaPage({ params }: Props) {
  const sessionId = await getSessionId();
  if (!sessionId) redirect("/jogo");

  const { tela } = await params;
  const screenNumber = parseInt(tela, 10);
  if (isNaN(screenNumber) || screenNumber < 1 || screenNumber > 5) {
    redirect("/jogo");
  }

  const scenario = await prisma.phishingScenario.findUnique({
    where: { id: screenNumber },
  });
  const session = await prisma.gameSession.findUnique({
    where: { id: sessionId },
    include: { player: true },
  });

  if (!scenario || !session) redirect("/jogo");

  return (
    <GameScreen
      screenNumber={screenNumber}
      totalScreens={5}
      title={scenario.title}
      slug={scenario.slug}
      playerName={session.player.name}
      indicators={INDICATORS}
    />
  );
}
