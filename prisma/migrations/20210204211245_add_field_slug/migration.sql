/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[slug]` on the table `categories`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "categories.slug_unique" ON "categories"("slug");
