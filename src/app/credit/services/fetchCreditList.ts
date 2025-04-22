import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { ICredit, ICreditCardFinance, ICreditCards } from '@/lib/definitions';
import prisma from '@/lib/prisma';
dayjs.extend(utc);

export const fetchCreditList = async () => {
  try {
    const credits = (await prisma.credit.findMany({
      select: {
        id: true,
        bank: true,
        currency: true,
        interestAnual: true,
        balance: true,
        monthlyPayment: true,
        insurance: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })) as ICredit[];

    const creditsCards = (await prisma.creditCards.findMany({
      select: {
        id: true,
        bank: true,
        cashPaymentCRC: true,
        cashPaymentUSD: true,
        interestAnual: true,
        interestMoratorium: true,
        minimumPaymentCRC: true,
        minimumPaymentUSD: true,
        creditCardFinances: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })) as ICreditCards[];

    const creditCardFinances = (await prisma.creditCardFinance.findMany({
      select: {
        id: true,
        bank: true,
        interestRate: true,
        interestMoratorium: true,
        currency: true,
        interestAnual: true,
        balance: true,
        monthlyPayment: true,
        insurance: true,
        creditCardId: true,
        creditCards: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })) as ICreditCardFinance[];

    return {
      credits,
      creditsCards,
      creditCardFinances,
    };
  } catch (error) {
    console.error('Error in fetchCreditList service:', error);

    throw new Error(
      `Failed to fetch credit list: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};
