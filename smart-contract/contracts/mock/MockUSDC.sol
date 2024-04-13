pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDC is ERC20 {
    constructor() ERC20("Mock USDC", "mUSD") {
        _mint(msg.sender, 1000000 * 10 ** uint256(decimals())); // Mint 1 million tokens
    }

    // Function to mint new tokens on demand
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}