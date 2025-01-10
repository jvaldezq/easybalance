import { NextResponse } from 'next/server';

import { createExpense } from '@/services/expense/createExpense';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object') {
      throw new Error('Invalid request body. Expected an object.');
    }

    const expense = await createExpense(body);
    return NextResponse.json(expense, { status: 200 });
  } catch (error) {
    console.error('Error in POST /expense:', error);

    const statusCode = 500;
    let message = 'Internal Server Error';

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
