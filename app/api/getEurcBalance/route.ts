import { NextRequest, NextResponse } from "next/server";
const {Web3} = require('web3');


export async function GET(request: NextRequest) {
    const userAddress = request.nextUrl.searchParams.get('userAddress');

    if (!userAddress) {
        return new NextResponse(JSON.stringify({ message: 'Missing required query parameters' }), {status: 401, headers: {'Content-Type': 'application/json'}});
    }
    const tokenAddress = "0x4e1742B9fa86fa505b8B8f2eadb5b52c7f734334";

    try {
        const balance = await getTokenBalance(tokenAddress, userAddress);
        return new NextResponse(JSON.stringify({ balance: balance }), {status: 200, headers: {'Content-Type': 'application/json'}});
    } catch (error: any) {
      return new NextResponse(JSON.stringify({  message: 'Failed to retrieve balance', error: error.message }), {status: 500, headers: {'Content-Type': 'application/json'}});
    }
}

const getTokenBalance = async (tokenAddress: String, userAddress: String) => {
    const providerUrl = 'https://rpc-evm-sidechain.xrpl.org';
    const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));
    const tokenAbi = [
        {
            "constant": true,
            "inputs": [{"name": "_owner", "type": "address"}],
            "name": "balanceOf",
            "outputs": [{"name": "balance", "type": "uint256"}],
            "type": "function"
        }
    ];
    const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);

    try {
        const balance = await tokenContract.methods.balanceOf(userAddress).call();
        const formattedBalance = web3.utils.fromWei(balance, 'ether'); // Adjust decimals as necessary
        return formattedBalance;
    } catch (error) {
        console.error("Error getting balance: ", error);
        throw error;
    }
};