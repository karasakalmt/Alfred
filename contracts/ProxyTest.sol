//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


contract ProxyTest {
    
    uint256 public number;

    function increseNumber() public {
        number++;
    }
     function decreaseNumber() public {
        number--;
    }
}

