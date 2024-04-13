import {ethers} from "hardhat";

// 0x7D6F7C7F36cd6E43F324015a91898e395fb88bEA
const main = async () => {
    const MockUSDCFactory = await ethers.getContractFactory("MockUSDC");
    const mockUSDC = await MockUSDCFactory.deploy();
    const mockUSDCAddress = mockUSDC.address;

    console.log("MockUSDC address: ", mockUSDCAddress);
}

main();