-- Make playerId nullable in Answer table
ALTER TABLE "Answer" ALTER COLUMN "playerId" DROP NOT NULL;

-- Add category column to Question table
ALTER TABLE "Question" ADD COLUMN IF NOT EXISTS "category" TEXT;

-- Make quizid nullable in Question table
ALTER TABLE "Question" ALTER COLUMN "quizid" DROP NOT NULL; 