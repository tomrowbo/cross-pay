pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockEURC is ERC20 {
    constructor() ERC20("Mock EURC", "mEUR") {
        _mint(msg.sender, 1000000 * 10 ** uint256(decimals())); // Mint 1 million tokens
    }
}
