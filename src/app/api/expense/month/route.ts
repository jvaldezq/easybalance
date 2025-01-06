import { NextResponse } from 'next/server';

import { fetchMonthExpenseAmount } from '@/services/expense/fetchMonthExpenseAmount';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const billId = searchParams.get('billId');

    if (!billId) {
      throw new Error('Invalid request. Expected a billId.');
    }

    const expense = await fetchMonthExpenseAmount(billId);
    return NextResponse.json(expense, { status: 200 });
  } catch (error) {
    console.error('Error in GET /expense/month:', error);

    const statusCode = 500;
    let message = 'Internal Server Error';

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
