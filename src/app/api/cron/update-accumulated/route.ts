import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

dayjs.extend(utc);
dayjs.extend(timezone);

export async function GET() {
  try {
    const now = dayjs().tz('America/Costa_Rica');

    const previousMonthStart = now
      .subtract(1, 'month')
      .startOf('month')
      .toDate();
    const previousMonthEnd = now.subtract(1, 'month').endOf('month').toDate();

    const bills = await prisma.bill.findMany({
      include: {
        expenses: {
          where: {
            createdAt: {
              gte: previousMonthStart,
              lte: previousMonthEnd,
            },
          },
        },
      },
    });

    const updatePromises = bills.map((bill) => {
      const totalExpenses = bill.expenses.reduce(
        (sum, exp) => sum + exp.amount,
        0,
      );
      const net = bill.amount - totalExpenses;
      const newAccumulatedAmount = bill.accumulatedAmount + net;

      return prisma.bill.update({
        where: { id: bill.id },
        data: {
          accumulatedAmount: newAccumulatedAmount,
        },
      });
    });

    await Promise.all(updatePromises);

    return NextResponse.json({
      success: true,
      message: `${updatePromises.length} bills updated.`,
    });
  } catch (error) {
    console.error('Cron error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
