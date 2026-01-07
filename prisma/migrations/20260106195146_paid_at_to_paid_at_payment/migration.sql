/*
  Warnings:

  - You are about to drop the column `PaidAt` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `paidAt` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "PaidAt",
ADD COLUMN     "paidAt" TIMESTAMP(3) NOT NULL;
