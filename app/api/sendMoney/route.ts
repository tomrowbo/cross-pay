// pages/api/sendMoney.js
import { Db, MongoClient } from 'mongodb';
import { connectToMongoDB } from '../../../database.js'
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server.js';


export async function GET(req: NextRequest) {
    return new NextResponse(JSON.stringify(transactions))

}


export async function POST(req: NextRequest) {
    const fromAddress = req.nextUrl.searchParams.get('fromAddress');
    const toAddress = req.nextUrl.searchParams.get('toAddress');
    const transAmount = req.nextUrl.searchParams.get('transAmount');
    addTransaction(fromAddress!!, toAddress!!, parseInt(transAmount!!))
}


// Define a Transaction interface for better type checking
interface Transaction {
    from: string;
    to: string;
    amount: number;
}

// This array will hold all transactions in memory
const transactions: Transaction[] = [];

/**
 * Adds a transaction to the in-memory transaction list.
 * 
 * @param from - The wallet address of the sender.
 * @param to - The recipient address.
 * @param amount - The amount of the transaction.
 */
function addTransaction(from: string, to: string, amount: number): void {
    // Create a new transaction object
    const newTransaction: Transaction = {
        from,
        to,
        amount
    };

    // Add the new transaction to the array
    transactions.push(newTransaction);

    // Optionally, log the current state of transactions for debugging
    console.log(transactions);
}

