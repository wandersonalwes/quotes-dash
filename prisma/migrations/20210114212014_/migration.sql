/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[content]` on the table `quotes`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "quotes.content_unique" ON "quotes"("content");
