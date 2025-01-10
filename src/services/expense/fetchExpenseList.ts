import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IExpense } from '@/lib/definitions';
import prisma from '@/lib/prisma';
dayjs.extend(utc);

export const fetchExpenseList = async () => {
  try {
    // Convert Costa Rica time (UTC -6) to GMT (UTC)
    const startOfDayInCostaRica = dayjs()
      .utc()
      .subtract(6, 'hours')
      .startOf('day');
    const endOfDayInCostaRica = dayjs().utc().subtract(6, 'hours').endOf('day');

    // Convert those to GMT by adding 6 hours to the Costa Rica time
    const startOfDayInGMT = startOfDayInCostaRica.add(6, 'hours').toDate();
    const endOfDayInGMT = endOfDayInCostaRica.add(6, 'hours').toDate();

    return (await prisma.expense.findMany({
      select: {
        id: true,
        amount: true,
        currency: true,
        paymentMethod: true,
        bill: {
          select: {
            name: true,
          },
        },
        description: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        createdAt: {
          gte: startOfDayInGMT,
          lte: endOfDayInGMT,
        },
      },
    })) as IExpense[];
  } catch (error) {
    console.error('Error in fetchExpenseList service:', error);

    throw new Error(
      `Failed to create expense: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};
