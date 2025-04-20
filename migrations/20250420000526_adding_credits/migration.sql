-- CreateTable
CREATE TABLE "Credit" (
    "id" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "interestRate" DOUBLE PRECISION,
    "interestMoratorium" DOUBLE PRECISION,
    "currency" TEXT NOT NULL,
    "interestAnual" DOUBLE PRECISION NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "monthlyPayment" DOUBLE PRECISION NOT NULL,
    "insurance" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Credit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCards" (
    "id" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "cashPaymentCRC" DOUBLE PRECISION NOT NULL,
    "cashPaymentUSD" DOUBLE PRECISION NOT NULL,
    "interestAnual" DOUBLE PRECISION NOT NULL,
    "interestMoratorium" DOUBLE PRECISION NOT NULL,
    "minimumPaymentCRC" DOUBLE PRECISION NOT NULL,
    "minimumPaymentUSD" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreditCards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCardFinance" (
    "id" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "interestRate" DOUBLE PRECISION,
    "interestMoratorium" DOUBLE PRECISION,
    "currency" TEXT NOT NULL,
    "interestAnual" DOUBLE PRECISION NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "monthlyPayment" DOUBLE PRECISION NOT NULL,
    "insurance" DOUBLE PRECISION NOT NULL,
    "creditCardId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreditCardFinance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CreditCardFinance" ADD CONSTRAINT "CreditCardFinance_creditCardId_fkey" FOREIGN KEY ("creditCardId") REFERENCES "CreditCards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
