import { ethers } from "hardhat";

// 0xf3931e3E4E9E81e6747c95900Fe7cF570C200ac0
const main = async () => {
    const TokenToTokenExchangeFactory = await ethers.getContractFactory("TokenToTokenExchange");
    // The constructor for this contract requires addresses for tokenA and tokenB.
    // Let's assume you have those addresses (replace 'addressTokenA' and 'addressTokenB' with actual addresses).
    const tokenToTokenExchange = await TokenToTokenExchangeFactory.deploy("0x7D6F7C7F36cd6E43F324015a91898e395fb88bEA", "0x4e1742B9fa86fa505b8B8f2eadb5b52c7f734334", "TokenToToken LX", "TTTLX");
    await tokenToTokenExchange.deployed();

    console.log("TokenToTokenExchange address: ", tokenToTokenExchange.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
