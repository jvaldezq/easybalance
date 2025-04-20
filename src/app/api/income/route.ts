import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Check if the body is null or undefined
    if (!body) {
      return NextResponse.json(
        { error: 'Request body is missing.' },
        { status: 400 },
      );
    }

    // Check if the body is not an object.
    if (typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body. Expected an object.' },
        { status: 400 },
      );
    }

    // Convert amount to a number, handle potential errors
    const amount = Number(body.amount);
    if (isNaN(amount)) {
      return NextResponse.json(
        { error: 'Amount must be a valid number.' },
        { status: 400 },
      );
    }

    // Ensure ivaTax and rentTax are numbers, default to 0 if missing
    const ivaTax = body.ivaTax !== undefined ? Number(body.ivaTax) : 0;
    const rentTax = body.rentTax !== undefined ? Number(body.rentTax) : 0;

    const response = await prisma.income.create({
      data: {
        description: body.description,
        category: body.category,
        amount: amount,
        currency: body.currency,
        ivaTax: ivaTax,
        rentTax: rentTax,
      },
    });
    revalidatePath('/income', 'page');
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error in POST /income:', error);

    const statusCode = 500;
    let message = 'Internal Server Error';

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
