// lib/ethereum.js

const {Web3} = require('web3');

// Function to get the balance of a token for a user
const getTokenBalance = async (tokenAddress: String, userAddress: String) => {
    const providerUrl = ' https://rpc-evm-sidechain.xrpl.org';
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

module.exports = { getTokenBalance };
