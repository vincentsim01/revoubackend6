/*
  Warnings:

  - You are about to drop the column `notes` on the `BookingSession` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `BookingSession` table. All the data in the column will be lost.
  - Made the column `transactionId` on table `BookingSession` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "BookingSession" DROP CONSTRAINT "BookingSession_transactionId_fkey";

-- AlterTable
ALTER TABLE "BookingSession" DROP COLUMN "notes",
DROP COLUMN "status",
ALTER COLUMN "transactionId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "BookingSession" ADD CONSTRAINT "BookingSession_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
