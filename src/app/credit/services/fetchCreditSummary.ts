import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import prisma from '@/lib/prisma';
dayjs.extend(utc);

export const fetchCreditSummary = async () => {
  try {
    const credits = await prisma.credit.aggregate({
      _sum: {
        monthlyPayment: true,
        balance: true,
      },
    });

    const creditsCards = await prisma.creditCards.aggregate({
      _sum: {
        cashPaymentCRC: true,
        cashPaymentUSD: true,
        minimumPaymentCRC: true,
        minimumPaymentUSD: true,
      },
    });

    const creditCardFinances = await prisma.creditCardFinance.aggregate({
      _sum: {
        balance: true,
      },
    });

    return {
      credits: credits._sum,
      creditsCards: creditsCards._sum,
      creditCardFinances: creditCardFinances._sum,
    };
  } catch (error) {
    console.error('Error in fetchCreditList service:', error);

    throw new Error(
      `Failed to fetch credit list: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};
