-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameSession" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "GameSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScreenAttempt" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "screenNumber" INTEGER NOT NULL,
    "selectedIndicators" TEXT[],
    "correctCount" INTEGER NOT NULL,
    "totalCorrect" INTEGER NOT NULL,
    "scorePercent" DOUBLE PRECISION NOT NULL,
    "timeSpentSeconds" INTEGER,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScreenAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhishingScenario" (
    "id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "correctIndicatorIds" TEXT[],
    "hint" TEXT,

    CONSTRAINT "PhishingScenario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ScreenAttempt_sessionId_screenNumber_key" ON "ScreenAttempt"("sessionId", "screenNumber");

-- CreateIndex
CREATE UNIQUE INDEX "PhishingScenario_slug_key" ON "PhishingScenario"("slug");

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScreenAttempt" ADD CONSTRAINT "ScreenAttempt_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "GameSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
