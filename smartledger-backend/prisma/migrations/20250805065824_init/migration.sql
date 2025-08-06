/*
  Warnings:

  - You are about to drop the column `createdAt` on the `BankTransaction` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `BankTransaction` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to drop the column `extracted` on the `EmailReceipt` table. All the data in the column will be lost.
  - You are about to drop the column `ledgerId` on the `EmailReceipt` table. All the data in the column will be lost.
  - You are about to drop the column `pdfUrl` on the `EmailReceipt` table. All the data in the column will be lost.
  - You are about to drop the column `sender` on the `EmailReceipt` table. All the data in the column will be lost.
  - You are about to alter the column `confidence` on the `EmailReceipt` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the `Ledger` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `source` to the `BankTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statementId` to the `BankTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `EmailReceipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `EmailReceipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `EmailReceipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendor` to the `EmailReceipt` table without a default value. This is not possible if the table is not empty.
  - Made the column `confidence` on table `EmailReceipt` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."MatchStatus" AS ENUM ('MATCHED', 'UNMATCHED', 'PENDING');

-- DropForeignKey
ALTER TABLE "public"."EmailReceipt" DROP CONSTRAINT "EmailReceipt_ledgerId_fkey";

-- AlterTable
ALTER TABLE "public"."BankTransaction" DROP COLUMN "createdAt",
ADD COLUMN     "balance" DECIMAL(65,30),
ADD COLUMN     "confidence" INTEGER,
ADD COLUMN     "matchedLedgerId" TEXT,
ADD COLUMN     "source" TEXT NOT NULL,
ADD COLUMN     "statementId" TEXT NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "public"."EmailReceipt" DROP COLUMN "extracted",
DROP COLUMN "ledgerId",
DROP COLUMN "pdfUrl",
DROP COLUMN "sender",
ADD COLUMN     "amount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "vendor" TEXT NOT NULL,
ALTER COLUMN "confidence" SET NOT NULL,
ALTER COLUMN "confidence" SET DATA TYPE INTEGER;

-- DropTable
DROP TABLE "public"."Ledger";

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EmailConnection" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailConnection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."StripeConnection" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StripeConnection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LedgerEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "vendor" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "public"."MatchStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "LedgerEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BankStatement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL,
    "rows" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BankStatement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."EmailConnection" ADD CONSTRAINT "EmailConnection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StripeConnection" ADD CONSTRAINT "StripeConnection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LedgerEntry" ADD CONSTRAINT "LedgerEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BankStatement" ADD CONSTRAINT "BankStatement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BankTransaction" ADD CONSTRAINT "BankTransaction_statementId_fkey" FOREIGN KEY ("statementId") REFERENCES "public"."BankStatement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EmailReceipt" ADD CONSTRAINT "EmailReceipt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
