-- CreateTable
CREATE TABLE "public"."Ledger" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "category" TEXT,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ledger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BankTransaction" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BankTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EmailReceipt" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "pdfUrl" TEXT NOT NULL,
    "extracted" BOOLEAN NOT NULL DEFAULT false,
    "confidence" DOUBLE PRECISION,
    "ledgerId" TEXT,

    CONSTRAINT "EmailReceipt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."EmailReceipt" ADD CONSTRAINT "EmailReceipt_ledgerId_fkey" FOREIGN KEY ("ledgerId") REFERENCES "public"."Ledger"("id") ON DELETE SET NULL ON UPDATE CASCADE;
