/*
  Warnings:

  - You are about to drop the column `stauts` on the `Call` table. All the data in the column will be lost.
  - Added the required column `status` to the `Call` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Call" DROP COLUMN "stauts",
ADD COLUMN     "status" TEXT NOT NULL;
