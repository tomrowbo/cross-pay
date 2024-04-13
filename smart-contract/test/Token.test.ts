import { ethers } from 'hardhat';
import { expect } from 'chai';

describe("Token contract", function () {
    it("Deployment should assign the total supply of tokens to the owner", async function () {
      const [owner] = await ethers.getSigners();
  
      const hardhatToken = await ethers.deployContract("MockUSDC");
  
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });