// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";


pragma solidity ^0.8.0;


contract ProxyTestV2 is Initializable {
    
    uint256 public number;

     function initialize(uint256 _number) public initializer {
        number = _number;
    }

    function increseNumber() public {
        number++;
    }
     function decreaseNumber() public {
        number--;
    }
}

