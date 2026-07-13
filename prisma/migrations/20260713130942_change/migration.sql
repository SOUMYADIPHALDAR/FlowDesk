/*
  Warnings:

  - You are about to drop the column `jobRole` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "jobRole",
ADD COLUMN     "department" TEXT,
ADD COLUMN     "designation" TEXT;
