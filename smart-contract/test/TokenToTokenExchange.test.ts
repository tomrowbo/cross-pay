import { ethers } from 'hardhat';
import { expect } from 'chai';
import { TokenToTokenExchange, MockUSDC, MockEURC } from '../typechain-types';
import { Signer } from '@nomicfoundation/hardhat-ethers/signers';
import { parseUnits } from 'ethers/lib/utils';

describe("TokenToTokenExchange Contract", function () {
  let mockUSDC: MockUSDC;
  let mockEURC: MockEURC;
  let exchange: TokenToTokenExchange;
  let owner: Signer;
  let addr1: Signer;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    const MockUSDCArtifact = await ethers.getContractFactory("MockUSDC");
    mockUSDC = await MockUSDCArtifact.deploy();
    const MockEURCArtifact = await ethers.getContractFactory("MockEURC");
    mockEURC = await MockEURCArtifact.deploy();

    const ExchangeArtifact = await ethers.getContractFactory("TokenToTokenExchange");
    exchange = await ExchangeArtifact.deploy(mockUSDC.address, mockEURC.address, "Exchange Liquidity Token", "ELT");

    await mockUSDC.mint(owner.getAddress(), parseUnits('10000', 6));
    await mockEURC.mint(owner.getAddress(), parseUnits('10000', 6));

    await mockUSDC.connect(owner).approve(exchange.address, parseUnits('10000', 6));
    await mockEURC.connect(owner).approve(exchange.address, parseUnits('10000', 6));
  });

  describe("addLiquidity", function () {
    it("should add liquidity", async function () {
      const amountUSDC = parseUnits('1000', 6);
      const amountEURC = parseUnits('800', 6);

      await exchange.addLiquidity(amountUSDC, amountEURC);

      const [reserveUSDC, reserveEURC] = await exchange.getReserves();
      expect(reserveUSDC).to.equal(amountUSDC);
      expect(reserveEURC).to.equal(amountEURC);
      expect(await exchange.totalSupply()).to.equal(amountUSDC.add(amountEURC)); // Update this based on your liquidity minting logic
    });
  });

  describe("removeLiquidity", function () {
    it("should remove liquidity and return both tokens proportionally", async function () {
        const amountUSDC = parseUnits('1000', 6);
        const amountEURC = parseUnits('800', 6);
        await exchange.addLiquidity(amountUSDC, amountEURC);

        // Calling removeLiquidity and waiting for the transaction to be mined
        const tx = await exchange.removeLiquidity(amountUSDC.add(amountEURC)); // Ensure correct argument, might need adjustment
        await tx.wait(); // Wait for the transaction to be mined

        // After the transaction is mined, check the reserves
        const [reserveUSDC, reserveEURC] = await exchange.getReserves();
        expect(reserveUSDC.toString()).to.equal('0');
        expect(reserveEURC.toString()).to.equal('0');
    });
});

  describe("swapTokens", function () {
    it("should swap one token for another", async function () {
      const initialAmountUSDC = parseUnits('1000', 6);
      const initialAmountEURC = parseUnits('800', 6);
      await exchange.addLiquidity(initialAmountUSDC, initialAmountEURC);

      const amountToSwap = parseUnits('100', 6);
      const minAmountOut = parseUnits('70', 6);
      await exchange.swap(amountToSwap, mockUSDC.address, minAmountOut);

      const [reserveUSDC, reserveEURC] = await exchange.getReserves();
      expect(reserveUSDC).to.be.greaterThan(initialAmountUSDC);
      expect(reserveEURC).to.be.lessThan(initialAmountEURC);
    });
  });

  describe("getAmountOfTokens", function () {
    it("should calculate output token amount correctly", async function () {
      const inputAmount = parseUnits('100', 6);
      const inputReserve = parseUnits('1000', 6);
      const outputReserve = parseUnits('800', 6);

      const outputAmount = await exchange.getAmountOfTokens(inputAmount, inputReserve, outputReserve);
      expect(outputAmount.toString()).to.equal('72528871');
    });

    it("should revert with invalid reserves", async function () {
      await expect(exchange.getAmountOfTokens(100, 0, 0)).to.be.revertedWith("Invalid reserves");
    });
  });

  describe("swapToAddress", function () {
    it("should swap tokens and send the output to a specified address", async function () {
        // Arrange
        const initialAmountUSDC = parseUnits('1000', 6);
        const initialAmountEURC = parseUnits('800', 6);
        await exchange.addLiquidity(initialAmountUSDC, initialAmountEURC);
        
        const amountToSwap = parseUnits('100', 6);
        const minAmountOut = parseUnits('70', 6); // Minimum expected output

        // Act: owner swaps USDC for EURC, output should go to addr1
        await exchange.swapToAddress(amountToSwap, mockUSDC.address, minAmountOut, addr1.address);

        // Assert
        const finalAmountUSDC = await mockUSDC.balanceOf(owner.address);
        const finalAmountEURC = await mockEURC.balanceOf(addr1.address);

        // expect(finalAmountUSDC.toString()).to.equal(parseUnits('900', 6).toString()); // 1000 - 100 swapped
        expect(finalAmountEURC).to.be.gte(minAmountOut); // At least 70 EURC received by addr1
        const [reserveUSDC, reserveEURC] = await exchange.getReserves();
        expect(reserveUSDC).to.be.gte(initialAmountUSDC); // Increased due to swap
        expect(reserveEURC).to.be.lte(initialAmountEURC); // Decreased due to swap
    });
});

});
