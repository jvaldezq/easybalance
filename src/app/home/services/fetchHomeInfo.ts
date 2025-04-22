import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import prisma from '@/lib/prisma';
dayjs.extend(utc);

export const fetchHomeInfo = async () => {
  try {
    let createdAt = undefined;

    // Convert Costa Rica time (UTC -6) to GMT (UTC)
    const startOfDayInCostaRica = dayjs()
      .utc()
      .subtract(6, 'hours')
      .startOf('month');
    const endOfDayInCostaRica = dayjs()
      .utc()
      .subtract(6, 'hours')
      .endOf('month');

    // Convert those to GMT by adding 6 hours to the Costa Rica time
    const startOfDayInGMT = startOfDayInCostaRica.add(6, 'hours').toDate();
    const endOfDayInGMT = endOfDayInCostaRica.add(6, 'hours').toDate();

    createdAt = {
      createdAt: {
        gte: startOfDayInGMT,
        lte: endOfDayInGMT,
      },
    };

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

    const creditCardsBalanceCRC = creditsCards._sum.cashPaymentCRC || 0;
    const creditCardsPaymentCRC = creditsCards._sum.minimumPaymentCRC || 0;

    const creditCardsBalanceUSD = creditsCards._sum.cashPaymentUSD || 0;
    const creditCardsPaymentUSD = creditsCards._sum.minimumPaymentUSD || 0;

    const creditsBalanceUSD = credits._sum.balance || 0;
    const creditsPaymentUSD = credits._sum.monthlyPayment || 0;

    const creditCardFinancesBalanceUSD = creditCardFinances._sum.balance || 0;

    const bills = await prisma.bill.findMany();
    const billsAmount: { [currency: string]: number } = {};

    bills.forEach((bill) => {
      billsAmount[bill.currency] =
        (billsAmount[bill.currency] || 0) + bill.amount;
    });

    const billsAccumulated: { [currency: string]: number } = {};

    bills.forEach((bill) => {
      billsAccumulated[bill.currency] =
        (billsAccumulated[bill.currency] || 0) + bill.accumulatedAmount;
    });

    const incomes = await prisma.income.findMany({
      where: {
        ...createdAt,
      },
    });

    const incomeAmount: { [currency: string]: number } = {};

    incomes.forEach((income) => {
      incomeAmount[income.currency] =
        (incomeAmount[income.currency] || 0) + income.amount;
    });

    const incomesIvaTax = await prisma.income.findMany({
      where: {
        ivaTax: {
          not: null,
        },
      },
    });

    const ivaTaxAmount: { [currency: string]: number } = {};

    incomesIvaTax.forEach((income) => {
      if (income.ivaTax !== null) {
        ivaTaxAmount[income.currency] =
          (ivaTaxAmount[income.currency] || 0) + income.ivaTax;
      }
    });

    const incomesRentTax = await prisma.income.findMany({
      where: {
        rentTax: {
          not: null,
        },
      },
    });
    const rentTaxAmount: { [currency: string]: number } = {};

    incomesRentTax.forEach((income) => {
      if (income.rentTax !== null) {
        rentTaxAmount[income.currency] =
          (rentTaxAmount[income.currency] || 0) + income.rentTax;
      }
    });

    return {
      credits: {
        dollar: {
          balance: creditCardsBalanceUSD + creditsBalanceUSD,
          payments: creditCardsPaymentUSD + creditsPaymentUSD,
        },
        collons: {
          balance: creditCardsBalanceCRC + creditCardFinancesBalanceUSD,
          payments: creditCardsPaymentCRC,
        },
      },
      billsAmount,
      billsAccumulated,
      incomeAmount,
      ivaTaxAmount,
      rentTaxAmount,
    };
  } catch (error) {
    console.error('Error in fetchCreditList service:', error);

    throw new Error(
      `Failed to fetch credit list: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};
