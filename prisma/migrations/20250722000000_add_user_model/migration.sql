-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Add userId column to Player table
ALTER TABLE "Player" ADD COLUMN "userId" TEXT;

-- Add foreign key constraint
ALTER TABLE "Player" ADD CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Enable Row Level Security for User table
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;

-- Create policies for User table
CREATE POLICY "Allow anonymous read users" ON "User"
    FOR SELECT
    TO anon
    USING (true);

CREATE POLICY "Allow anonymous create users" ON "User"
    FOR INSERT
    TO anon
    WITH CHECK (true);

CREATE POLICY "Allow anonymous update own users" ON "User"
    FOR UPDATE
    TO anon
    USING (true)
    WITH CHECK (true); 