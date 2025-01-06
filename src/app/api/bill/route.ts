import { NextResponse } from 'next/server';

import { fetchBillList } from '@/services/bill/fetchBillList';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

export async function GET() {
  try {
    const bills = await fetchBillList();
    return NextResponse.json(bills, { status: 200 });
  } catch (error) {
    console.error('Error in GET /expense:', error);

    const statusCode = 500;
    let message = 'Internal Server Error';

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
