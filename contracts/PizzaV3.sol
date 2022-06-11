// SPDX-License-Identifier: MIT
// test contract source -> https://blog.logrocket.com/using-uups-proxy-pattern-upgrade-smart-contracts/
pragma solidity ^0.8.10;

import "./Pizza.sol";

contract PizzaV3 is Pizza {
   ///@dev increments the slices when called
   function refillSlice() external {
       slices += 2;
   }

   ///@dev returns the contract version
   function pizzaVersion() external pure returns (uint256) {
       return 3;
   }
}