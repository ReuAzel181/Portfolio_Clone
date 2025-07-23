-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_playerId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quizid_fkey";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "gameStarted" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizid_fkey" FOREIGN KEY ("quizid") REFERENCES "Quiz"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;
