import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    evmSidechain: {
        url: "https://rpc-evm-sidechain.xrpl.org",
        accounts: ["d408ffbfd8b9454cff96c869a33215b7bd03c67ec3346d4e97d61075b1eca95e"]
    }
}
};

export default config;