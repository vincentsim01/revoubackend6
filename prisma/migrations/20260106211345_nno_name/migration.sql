/*
  Warnings:

  - You are about to drop the column `name` on the `Payment` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Payment_name_key";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "name",
ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;
