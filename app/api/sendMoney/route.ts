// pages/api/sendMoney.js
import { addTransaction, transactions } from '@/utils/transactionManager';
import { stat } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server.js';


export async function GET(req: NextRequest) {
    return new NextResponse(JSON.stringify(transactions))

}


export async function POST(req: NextRequest) {
    const fromAddress = req.nextUrl.searchParams.get('fromAddress');
    const toAddress = req.nextUrl.searchParams.get('toAddress');
    const transAmount = req.nextUrl.searchParams.get('amount');
    addTransaction(fromAddress!!, toAddress!!, parseInt(transAmount!!))

    return new NextResponse(JSON.stringify({message:"success"}), {
        headers: { 'Content-Type': 'application/json' },
      });

}
