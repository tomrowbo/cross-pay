import { getBalance } from "@/utils/transactionManager";
import { NextRequest, NextResponse } from "next/server";
const {Web3} = require('web3');


export async function GET(request: NextRequest) {
    const userAddress = request.nextUrl.searchParams.get('address');

    if (!userAddress) {
        return new NextResponse(JSON.stringify({ message: 'Missing required query parameters' }), {status: 401, headers: {'Content-Type': 'application/json'}});
    }
    try {
        const balance = await getBalance(userAddress);
        return new NextResponse(JSON.stringify({ balance: balance }), {status: 200, headers: {'Content-Type': 'application/json'}});
    } catch (error: any) {
      return new NextResponse(JSON.stringify({  message: 'Failed to retrieve balance', error: error.message }), {status: 500, headers: {'Content-Type': 'application/json'}});
    }
}
