/*
  Warnings:

  - Made the column `slug` on table `categories` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "slug" SET NOT NULL;
