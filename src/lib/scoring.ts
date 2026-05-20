export function calculateScreenScore(
  selected: string[],
  correct: string[]
): {
  correctCount: number;
  totalCorrect: number;
  scorePercent: number;
  missed: string[];
  falsePositives: string[];
} {
  const correctSet = new Set(correct);
  const selectedSet = new Set(selected);

  const correctCount = correct.filter((id) => selectedSet.has(id)).length;
  const totalCorrect = correct.length;
  const scorePercent =
    totalCorrect === 0 ? 0 : correctCount / totalCorrect;

  const missed = correct.filter((id) => !selectedSet.has(id));
  const falsePositives = selected.filter((id) => !correctSet.has(id));

  return {
    correctCount,
    totalCorrect,
    scorePercent,
    missed,
    falsePositives,
  };
}

export function calculateGlobalScore(scores: number[]): number {
  if (scores.length === 0) return 0;
  const avg =
    scores.reduce((sum, s) => sum + s, 0) / scores.length;
  return Math.round(avg * 100);
}
