// pages/api/addLiquidity.js

import Web3 from 'web3';
import { NextRequest, NextResponse } from 'next/server';

const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-evm-sidechain.xrpl.org'));

const exchangeAbi = [
    {
        "constant": false,
        "inputs": [
            {"name": "_amountA", "type": "uint256"},
            {"name": "_amountB", "type": "uint256"}
        ],
        "name": "addLiquidity",
        "outputs": [
            {"name": "liquidity", "type": "uint256"}
        ],
        "type": "function"
    }
];

export async function POST(request: NextRequest) {
    const amountA = request.nextUrl.searchParams.get('amountA');
    const amountB = request.nextUrl.searchParams.get('amountB');

    if (!amountA || !amountB) {
        return new NextResponse(JSON.stringify({ message: 'Missing required parameters' }), { status: 400, headers: { 'Content-Type': 'application/json' }});
    }

    const privateKey = "d408ffbfd8b9454cff96c869a33215b7bd03c67ec3346d4e97d61075b1eca95e";
    const tokenToTokenExchangeAddress = "0xf3931e3E4E9E81e6747c95900Fe7cF570C200ac0";
    const userAddress = "0x77f5504acf4712D8dB92a6C34b4bba49724acEE6";
    const contract = new web3.eth.Contract(exchangeAbi, tokenToTokenExchangeAddress);

    try {
        const tx = {
            from: userAddress,
            to: tokenToTokenExchangeAddress,
            gas: 2000000,
            data: contract.methods.addLiquidity(250000, 250000).encodeABI(),
            maxPriorityFeePerGas: web3.utils.toWei('2', 'gwei'),
            maxFeePerGas: web3.utils.toWei('100', 'gwei')
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
        const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        return new NextResponse(JSON.stringify({ message: 'Liquidity added successfully', transactionHash: txReceipt.transactionHash }), { status: 200, headers: { 'Content-Type': 'application/json' }});
    } catch (error: any) {
        console.error("Error adding liquidity: ", error);
        return new NextResponse(JSON.stringify({ message: 'Failed to add liquidity', detailedError: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' }});
    }
}
