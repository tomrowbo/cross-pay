pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract TokenToTokenExchange is ERC20 {

    address public tokenA;
    address public tokenB;

    constructor(address _tokenA, address _tokenB, string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        require(_tokenA != address(0) && _tokenB != address(0), "Token addresses cannot be the zero address");
        tokenA = _tokenA;
        tokenB = _tokenB;
    }

    /** 
    * @dev Returns the reserves of both tokens.
    */
    function getReserves() public view returns (uint, uint) {
        return (ERC20(tokenA).balanceOf(address(this)), ERC20(tokenB).balanceOf(address(this)));
    }

    /** 
    * @dev Adds liquidity to the exchange. The amount of tokens added must be in proportion to the reserves to maintain the price.
    */
    function addLiquidity(uint _amountA, uint _amountB) public returns (uint liquidity) {
        ERC20 tokenContractA = ERC20(tokenA);
        ERC20 tokenContractB = ERC20(tokenB);
        uint reserveA;
        uint reserveB;
        (reserveA, reserveB) = getReserves();

        if (reserveA == 0 && reserveB == 0) {
            tokenContractA.transferFrom(msg.sender, address(this), _amountA);
            tokenContractB.transferFrom(msg.sender, address(this), _amountB);
            liquidity = _amountA + _amountB; // Arbitrary example, implement actual liquidity token calculation.
        } else {
            uint amountBOptimal = (_amountA * reserveB) / reserveA;
            require(_amountB >= amountBOptimal, "Insufficient B token amount");

            tokenContractA.transferFrom(msg.sender, address(this), _amountA);
            tokenContractB.transferFrom(msg.sender, address(this), _amountB);
            liquidity = (_amountA * totalSupply()) / reserveA; // Based on A token proportion
        }
        _mint(msg.sender, liquidity);
        return liquidity;
    }

    /** 
    * @dev Removes liquidity and returns the tokens to the user.
    */
    function removeLiquidity(uint _liquidity) public returns (uint amountA, uint amountB) {
        uint totalSupply = totalSupply();
        amountA = (_liquidity * ERC20(tokenA).balanceOf(address(this))) / totalSupply;
        amountB = (_liquidity * ERC20(tokenB).balanceOf(address(this))) / totalSupply;
        _burn(msg.sender, _liquidity);
        ERC20(tokenA).transfer(msg.sender, amountA);
        ERC20(tokenB).transfer(msg.sender, amountB);
        return (amountA, amountB);
    }

    /** 
    * @dev Swaps one token for another.
    */
 function swap(uint _amountIn, address _tokenIn, uint _minAmountOut) public {
    require(_tokenIn == tokenA || _tokenIn == tokenB, "Invalid input token");
    address tokenOut = _tokenIn == tokenA ? tokenB : tokenA;
    
    uint reserveIn;
    uint reserveOut;
    uint reserveA;
    uint reserveB;
    
    (reserveA, reserveB) = getReserves();
    
    if (_tokenIn == tokenA) {
        reserveIn = reserveA;
        reserveOut = reserveB;
    } else {
        reserveIn = reserveB;
        reserveOut = reserveA;
    }

    uint amountOut = getAmountOfTokens(_amountIn, reserveIn, reserveOut);
    require(amountOut >= _minAmountOut, "Insufficient output amount");

    ERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);
    ERC20(tokenOut).transfer(msg.sender, amountOut);
}

    // Updated swap function that includes a recipient address
    function swapToAddress(uint _amountIn, address _tokenIn, uint _minAmountOut, address recipient) public {
        require(_tokenIn == tokenA || _tokenIn == tokenB, "Invalid input token");
        require(recipient != address(0), "Recipient address cannot be zero");
        address tokenOut = _tokenIn == tokenA ? tokenB : tokenA;

        uint reserveIn;
        uint reserveOut;
        uint reserveA;
        uint reserveB;

        (reserveA, reserveB) = getReserves();

        if (_tokenIn == tokenA) {
            reserveIn = reserveA;
            reserveOut = reserveB;
        } else {
            reserveIn = reserveB;
            reserveOut = reserveA;
        }

        uint amountOut = getAmountOfTokens(_amountIn, reserveIn, reserveOut);
        require(amountOut >= _minAmountOut, "Insufficient output amount");

        ERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);
        ERC20(tokenOut).transfer(recipient, amountOut);
    }


    /** 
    * @dev Returns the amount of output tokens that would be returned to the user in the swap.
    */
    function getAmountOfTokens(uint256 inputAmount, uint256 inputReserve, uint256 outputReserve) public pure returns (uint256) {
        require(inputReserve > 0 && outputReserve > 0, "Invalid reserves");
        uint256 inputAmountWithFee = inputAmount * (997); // 0.3% fee
        uint256 numerator = inputAmountWithFee * outputReserve;
        uint256 denominator = (inputReserve * 1000) + inputAmountWithFee;
        return numerator / denominator;
    }
}
