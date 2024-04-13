pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract Exchange is ERC20 {

    address public altTokenAddress;
    uint256 private constant FEE_PERCENT = 3;
    uint256 private constant FEE_DIVISOR = 1000;


    constructor(address _altTokenAddress, string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        require(_altTokenAddress != address(0), "Alt token address passed is a null address");
        altTokenAddress = _altTokenAddress;
    }

    /** 
    * @dev Returns the amount of `Alt Tokens` held by the contract
    * @return reserve The amount of `Alt Tokens` held by the contract
    */
    function getReserve() public view returns (uint) {
        return ERC20(altTokenAddress).balanceOf(address(this));
    }

    /**
    * @dev Adds liquidity to the exchange.
    * 
    * @param _amount The amount of `Alt Tokens` to be added to the exchange
    * @return liquidity The amount of liquidity tokens minted
    */
    function addLiquidity(uint _amount) public payable returns (uint) {
        uint liquidity;
        uint ethBalance = address(this).balance;
        uint altTokenReserve = getReserve();
        ERC20 altToken = ERC20(altTokenAddress);
        /* 
            If the reserve is empty, intake any user supplied value for 
            `Ether` and `Alt` tokens because there is no ratio currently
        */
        if(altTokenReserve == 0) {
            altToken.transferFrom(msg.sender, address(this), _amount);
            liquidity = ethBalance;
            _mint(msg.sender, liquidity);
        } else {
            /* 
                If the reserve is not empty, intake any user supplied value for 
                `Ether` and determine according to the ratio how many `Alt` tokens
                need to be supplied to prevent any large price impacts because of the additional
                liquidity
            */
            uint ethReserve =  ethBalance - msg.value;
            uint altTokenAmount = (msg.value * altTokenReserve)/(ethReserve);
            console.log("altTokenAmount", altTokenAmount);
            console.log("amount", _amount);
            require(_amount >= altTokenAmount, "Amount of tokens sent is less than the minimum tokens required");
            altToken.transferFrom(msg.sender, address(this), altTokenAmount);
            liquidity = (totalSupply() * msg.value)/ ethReserve;
            _mint(msg.sender, liquidity);
        }
         return liquidity;
    }

    /** 
    * @dev Returns the amount Eth/Alt tokens that would be returned to the user
    * in the swap
    * 
    * @param _amount The amount of liquidity tokens to be removed
    * @return ethAmount The amount of `Ether` returned to the user
    * @return altTokenAmount The amount of `Alt Tokens` returned to the user
    */
    function removeLiquidity(uint _amount) public returns (uint , uint) {
        require(_amount > 0, "_amount should be greater than zero");
        uint ethReserve = address(this).balance;
        uint _totalSupply = totalSupply();
        uint ethAmount = (ethReserve * _amount)/ _totalSupply;
        uint altTokenAmount = (getReserve() * _amount)/ _totalSupply;
        _burn(msg.sender, _amount);
        payable(msg.sender).transfer(ethAmount);
        ERC20(altTokenAddress).transfer(msg.sender, altTokenAmount);
        return (ethAmount, altTokenAmount);
    }

    /** 
    * @dev Returns the amount of Eth/Alt tokens that would be returned to the user
    * in the swap. This function is used to calculate the amount of Eth/Alt tokens
    * that would be returned to the user before the swap is executed
    * 
    * @param inputAmount The amount of X tokens to be swapped
    * @param inputReserve The amount of X tokens in the reserve
    * @param outputReserve The amount of Y tokens in the reserve
    * @return outputAmount The amount of Y tokens returned to the user
    */
    function getAmountOfTokens(
        uint256 inputAmount,
        uint256 inputReserve,
        uint256 outputReserve
    ) public pure returns (uint256) {
        
        require(inputReserve > 0 && outputReserve > 0, "invalid reserves");
        uint256 inputAmountWithFee = inputAmount * (FEE_DIVISOR - FEE_PERCENT); 
        uint256 numerator = inputAmountWithFee * outputReserve;
        uint256 denominator = (inputReserve * FEE_DIVISOR) + inputAmountWithFee;

        return numerator / denominator;
    }

    /** 
    * @dev Swaps Eth for alt Tokens
    */
    function ethToAltToken(uint _minTokens) public payable {
        uint256 tokenReserve = getReserve();
        uint256 tokensBought = getAmountOfTokens(
            msg.value,
            address(this).balance - msg.value,
            tokenReserve
        );

        require(tokensBought >= _minTokens, "Amount of tokens bought is less than the minimum tokens required");
        ERC20(altTokenAddress).transfer(msg.sender, tokensBought);
    }


    /** 
    * @dev Swaps alt Tokens for Eth
    */
    function altTokenToEth(uint _tokensSold, uint _minEth) public {
        uint256 tokenReserve = getReserve();
        uint256 ethBought = getAmountOfTokens(
            _tokensSold,
            tokenReserve,
            address(this).balance
        );
        require(ethBought >= _minEth, "Amount of eth sent is less than the minimum eth required");
        ERC20(altTokenAddress).transferFrom(
            msg.sender,
            address(this),
            _tokensSold
        );
        payable(msg.sender).transfer(ethBought);
    }
}