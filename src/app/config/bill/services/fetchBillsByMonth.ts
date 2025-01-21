import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IBill } from '@/lib/definitions';
import prisma from '@/lib/prisma';

dayjs.extend(utc);

export const fetchBillsByMonth = async (month?: string) => {
  try {
    // Determine the start and end of the month in Costa Rica time
    const targetDate = month
      ? dayjs(month, 'YYYY-MM').utc().subtract(6, 'hours')
      : dayjs().utc().subtract(6, 'hours');
    const startOfMonthInCostaRica = targetDate.startOf('month');
    const endOfMonthInCostaRica = targetDate.endOf('month');

    // Convert Costa Rica times to GMT
    const startOfMonthInGMT = startOfMonthInCostaRica.add(6, 'hours').toDate();
    const endOfMonthInGMT = endOfMonthInCostaRica.add(6, 'hours').toDate();

    // Fetch bills and calculate the sum of expenses for each bill
    const bills = await prisma.bill.findMany({
      select: {
        id: true,
        name: true,
        amount: true,
        currency: true,
        accumulatedAmount: true,
        category: true,
        createdAt: true,
        type: true,
        isPublic: true,
        expenses: {
          select: {
            amount: true,
            createdAt: true,
          },
          where: {
            createdAt: {
              gte: startOfMonthInGMT,
              lte: endOfMonthInGMT,
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transform the data to include the sum of expenses
    const result = bills.map((bill) => {
      const totalExpenses = bill.expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0,
      );
      return {
        totalExpenses,
        ...bill,
      };
    });

    return result as IBill[];
  } catch (error) {
    console.error('Error in fetchBillsByMonth service:', error);

    throw new Error(
      `Failed to fetch bills by month: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};
