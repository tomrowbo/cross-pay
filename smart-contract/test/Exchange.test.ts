import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Exchange, MockUSDC } from '../typechain-types';
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';
import { parseUnits } from 'ethers/lib/utils';
import { HardhatEthersProvider } from '@nomicfoundation/hardhat-ethers/internal/hardhat-ethers-provider';

describe("Exchange Contract", function () {

  let mockUSDC: MockUSDC;
  let mockEth: HardhatEthersProvider;
  let exchange: Exchange;
  let owner: HardhatEthersSigner;
  let addr1: HardhatEthersSigner;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    const liquidityTokenName = "Exchange Liquidity Token";
    const liquidityTokenSymbol = "ELT";

    mockUSDC = await ethers.deployContract("MockUSDC");
    exchange = await ethers.deployContract("Exchange", [mockUSDC.address, liquidityTokenName, liquidityTokenSymbol]);
    mockEth = ethers.provider;


    const transferAmount = parseUnits('1', 'ether');
    await owner.sendTransaction({
      to: addr1.address,
      value: transferAmount.toString(),
    });

  });

  describe("addLiquidity", function () {
    it("should add liquidity", async function () {
      // GIVEN
      await mockUSDC.approve(exchange.address, 1000);

      // WHEN
      await exchange.addLiquidity(1000, { value: parseUnits('6', 'ether') });

      // THEN
      expect(await exchange.getReserve()).to.equal(1000);
      expect(await exchange.totalSupply()).to.equal(parseUnits('6', 'ether'));

    });

    it("should add liquidity and keep ratio on second call", async function () {
      // GIVEN
      await mockUSDC.approve(exchange.address, 100000);
      await exchange.addLiquidity(1000, { value: parseUnits('10', 'ether') }); // Setting initial liquidity

      // WHEN
      await exchange.addLiquidity(500, { value: parseUnits('5', 'ether') });

      // THEN
      expect(await exchange.getReserve()).to.equal(1500);
      expect(await exchange.totalSupply()).to.equal(parseUnits('15', 'ether'));
    });

    it("should take half of tokens if too much alt provided", async function () {
      // GIVEN
      await mockUSDC.approve(exchange.address, 3000);
      await exchange.addLiquidity(1000, { value: parseUnits('5', 'ether') }); // Setting initial liquidity

      // WHEN
      await exchange.addLiquidity(2000, { value: parseUnits('5', 'ether') });

      // THEN
      expect(await exchange.getReserve()).to.equal(2000);

    });

    it("should fail and revert if not enough alt provided", async function () {
      // GIVEN
      await mockUSDC.approve(exchange.address, 1000);
      await exchange.addLiquidity(1000, { value: parseUnits('5', 'ether') });// Setting initial liquidity

      // WHEN & THEN
      await expect(exchange.addLiquidity(500, { value: parseUnits('5', 'ether') })).to.be.revertedWith("Amount of tokens sent is less than the minimum tokens required");
    });

  });

  describe("removeLiquidity", function () {
    it("should remove liquidity", async function () {
      // GIVEN
      await mockUSDC.approve(exchange.address, 1000);
      await exchange.addLiquidity(1000, { value: parseUnits('10', 'ether') }); // Setting initial liquidity

      // WHEN
      await exchange.removeLiquidity(parseUnits('10', 'ether'));

      // THEN
      expect(await exchange.getReserve()).to.equal(0);
      expect(await exchange.totalSupply()).to.equal(0);
    });
  });

  describe("getAmountOfTokens", function () {
    it("should return the amount of tokens", async function () {
      // GIVEN
      const inputAmount = 100;
      const inputReserve = 1000;
      const outputReserve = 5000;

      // WHEN & THEN
      expect(await exchange.getAmountOfTokens(inputAmount, inputReserve, outputReserve)).to.equal(453);
    });

    it("should revert when reserve are zero", async function () {
      // GIVEN
      const inputAmount = 100;
      const inputReserve = 0;
      const outputReserve = 0;

      // WHEN & THEN
      await expect(exchange.getAmountOfTokens(inputAmount, inputReserve, outputReserve)).to.be.revertedWith("invalid reserves");
    });
  });

  describe("ethToAltToken", function () {
    it("should convert eth to alt token", async function () {
      // GIVEN
      await mockUSDC.approve(exchange.address, 1000);
      await exchange.addLiquidity(1000, { value: parseUnits('10', 'ether') }); // Setting initial liquidity
      const initialAltBalance = await mockUSDC.balanceOf(owner.address);
      const initialEthBalance = await mockEth.getBalance(owner.address);
      const oneEthInWei = BigInt(parseUnits('1', 'ether').toBigInt());
      const expectedAltBalance = BigInt(initialAltBalance) + 90n;

      // WHEN
      await exchange.ethToAltToken(90, { value: parseUnits('1', 'ether') });
      const finalAltBalance = await mockUSDC.balanceOf(owner.address);
      const finalEthBalance = await mockEth.getBalance(owner.address);

      
      // THEN
      //Expect the final balance to be less 1 eth below initial due to paying for gas fees too.
      expect(finalEthBalance).to.be.lessThan(BigInt(initialEthBalance) - oneEthInWei);
      expect(finalAltBalance).to.be.equal(expectedAltBalance);
    });

    it("should revert when min tokens too high", async function () {
      // GIVEN
      await mockUSDC.approve(exchange.address, 1000);
      await exchange.addLiquidity(1000, { value: parseUnits('10', 'ether') }); // Setting initial liquidity

      // WHEN & THEN
      await expect(exchange.ethToAltToken(90, { value: parseUnits('0.5', 'ether') })).to.be.revertedWith("Amount of tokens bought is less than the minimum tokens required");
    });
  });

  describe("altTokenToEth", function () {
    it("should convert alt token to eth", async function () {
      // GIVEN
      await mockUSDC.approve(exchange.address, 1100);
      await exchange.addLiquidity(1000, { value: parseUnits('10', 'ether') }); // Setting initial liquidity
      const initialAltBalance = await mockUSDC.balanceOf(owner.address);
      const initialEthBalance = await mockEth.getBalance(owner.address);
      const oneEthInWei = BigInt(parseUnits('1', 'ether').toBigInt());


      // WHEN
      await exchange.altTokenToEth(100, parseUnits('0.1', 'ether'));
      const finalAltBalance = await mockUSDC.balanceOf(owner.address);
      const finalEthBalance = await mockEth.getBalance(owner.address);


      // THEN
      //Expect the final balance to be less 1 eth below initial due to paying for gas fees too.
      expect(finalEthBalance).to.be.greaterThan(initialEthBalance);
      expect(finalAltBalance).to.be.equal(BigInt(initialAltBalance) - 100n);
    });

    it("should revert when min eth too high", async function () {
      // GIVEN
      await mockUSDC.approve(exchange.address, 1100);
      await exchange.addLiquidity(1000, { value: parseUnits('10', 'ether') }); // Setting initial liquidity

      // WHEN & THEN
      await expect(exchange.altTokenToEth(100, parseUnits('1', 'ether'))).to.be.revertedWith("Amount of eth sent is less than the minimum eth required");
    });
  });

});