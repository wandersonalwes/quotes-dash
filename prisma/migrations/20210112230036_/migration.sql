/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[name]` on the table `categories`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "categories.name_unique" ON "categories"("name");
