import {ethers} from "hardhat";

// 0x4e1742B9fa86fa505b8B8f2eadb5b52c7f734334
const main = async () => {
    const MockEURCFactory = await ethers.getContractFactory("MockEURC");
    const mockEURC = await MockEURCFactory.deploy();
    const mockEURCAddress = mockEURC.address;

    console.log("MockEURC address: ", mockEURCAddress);
}

main();