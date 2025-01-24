import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IIncome } from '@/lib/definitions';
import prisma from '@/lib/prisma';
dayjs.extend(utc);

interface Props {
  month?: string;
}

export const fetchIncomeList = async (props: Props) => {
  const { month } = props;
  let createdAt = undefined;

  try {
    if (month) {
      // Convert Costa Rica time (UTC -6) to GMT (UTC)
      const startOfDayInCostaRica = dayjs(month)
        .utc()
        .subtract(6, 'hours')
        .startOf('month');
      const endOfDayInCostaRica = dayjs(month)
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
    } else {
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
    }

    return (await prisma.income.findMany({
      select: {
        id: true,
        description: true,
        category: true,
        amount: true,
        currency: true,
        ivaTax: true,
        rentTax: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        ...createdAt,
      },
    })) as IIncome[];
  } catch (error) {
    console.error('Error in fetchIncomeList service:', error);

    throw new Error(
      `Failed to fetch income list: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};
