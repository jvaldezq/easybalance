import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { GeneralBillResponse } from '@/app/expense/types';
import prisma from '@/lib/prisma';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);

export const fetchBills = async () => {
  try {
    const now = dayjs().tz('America/Costa_Rica');

    const monthStartCR = now.startOf('month');
    const monthEndCR = now.endOf('month');
    const yearStartCR = now.startOf('year');
    const yearEndCR = now.endOf('year');
    const todayStartCR = now.startOf('day');
    const todayEndCR = now.endOf('day');

    const yearStartUTC = yearStartCR.toDate();
    const yearEndUTC = yearEndCR.toDate();

    // === Fetch Bills and Expenses for Current Year ===
    const bills = await prisma.bill.findMany({
      orderBy: {
        type: 'asc',
      },
      include: {
        expenses: {
          where: {
            createdAt: {
              gte: yearStartUTC,
              lte: yearEndUTC,
            },
          },
        },
      },
    });

    const billsWithStats = bills.map((bill) => {
      const monthlyAmount = bill.amount;
      const annualAmount = bill.amount * 12;

      const yearlyExpenses = bill.expenses.reduce(
        (sum, exp) => sum + exp.amount,
        0,
      );

      const monthlyExpenses = bill.expenses
        .filter((expense) => {
          const created = dayjs(expense.createdAt).tz('America/Costa_Rica');
          return created.isBetween(monthStartCR, monthEndCR, null, '[]');
        })
        .reduce((sum, exp) => sum + exp.amount, 0);

      return {
        id: bill.id,
        name: bill.name,
        type: bill.type,
        currency: bill.currency,
        monthlyAmount,
        annualAmount,
        accumulatedAmount: bill.accumulatedAmount,
        expenses: {
          totalYear: yearlyExpenses,
          totalMonth: monthlyExpenses,
        },
      };
    });

    // === Fetch all expenses from current year (for generalData) ===
    const allExpenses = await prisma.expense.findMany({
      where: {
        createdAt: {
          gte: yearStartUTC,
          lte: yearEndUTC,
        },
      },
    });

    // === Generate generalData grouped by currency ===
    const generalData = allExpenses.reduce(
      (acc, expense) => {
        const currency = expense.currency;
        const created = dayjs(expense.createdAt).tz('America/Costa_Rica');

        if (!acc[currency]) {
          acc[currency] = {
            totalToday: 0,
            totalMonth: 0,
            totalYear: 0,
          };
        }

        if (created.isBetween(todayStartCR, todayEndCR, null, '[]')) {
          acc[currency].totalToday += expense.amount;
        }

        if (created.isBetween(monthStartCR, monthEndCR, null, '[]')) {
          acc[currency].totalMonth += expense.amount;
        }

        acc[currency].totalYear += expense.amount;

        return acc;
      },
      {} as Record<
        string,
        {
          totalToday: number;
          totalMonth: number;
          totalYear: number;
        }
      >,
    );

    return {
      bills: billsWithStats,
      generalData,
    } as unknown as GeneralBillResponse;
  } catch (error) {
    console.error('Error in fetching bills service:', error);

    throw new Error(
      `Failed to fetch bills: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};
