// pages/api/swapToAddress.js

import Web3, { utils } from 'web3';
import { NextRequest, NextResponse } from 'next/server';

// Initialize web3 with an HTTP provider
const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-evm-sidechain.xrpl.org'));

// ABI for interacting with the smart contract
const exchangeAbi = [
    {
        "constant": false,
        "inputs": [
            {"name": "_amountIn", "type": "uint256"},
            {"name": "_tokenIn", "type": "address"},
            {"name": "_minAmountOut", "type": "uint256"},
            {"name": "recipient", "type": "address"}
        ],
        "name": "swapToAddress",
        "outputs": [],
        "type": "function"
    }
];

export async function POST(request: NextRequest) {
    const amountIn = request.nextUrl.searchParams.get('amountIn');
    const tokenIn = request.nextUrl.searchParams.get('tokenIn');
    const minAmountOut = request.nextUrl.searchParams.get('minAmountOut');
    const recipient = request.nextUrl.searchParams.get('recipient');

    if (!amountIn || !tokenIn || !minAmountOut || !recipient) {
        return new NextResponse(JSON.stringify({ message: 'Missing required parameters' }), { status: 400, headers: { 'Content-Type': 'application/json' }});
    }

    // Private key and contract details
    const privateKey = "d408ffbfd8b9454cff96c869a33215b7bd03c67ec3346d4e97d61075b1eca95e";
    const tokenToTokenExchangeAddress = "0xf3931e3E4E9E81e6747c95900Fe7cF570C200ac0";
    const contract = new web3.eth.Contract(exchangeAbi, tokenToTokenExchangeAddress);

    try {
        const tx = {
            from: recipient,  // Assuming the recipient is also the message sender
            to: tokenToTokenExchangeAddress,
            gas: 2000000,
            data: contract.methods.swapToAddress(utils.toBn(amountIn), tokenIn, utils.toBN(minAmountOut), recipient).encodeABI(),
            maxPriorityFeePerGas: web3.utils.toWei('2', 'gwei'),
            maxFeePerGas: web3.utils.toWei('100', 'gwei')
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
        const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        return new NextResponse(JSON.stringify({ message: 'Swap executed successfully', transactionHash: txReceipt.transactionHash }), { status: 200, headers: { 'Content-Type': 'application/json' }});
    } catch (error) {
        console.error("Error executing swap: ", error);
        return new NextResponse(JSON.stringify({ message: 'Failed to execute swap', detailedError: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' }});
    }
}
