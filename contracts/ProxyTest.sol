// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol"

pragma solidity ^0.8.0;


contract ProxyTest is Initializable {
    
    uint256 public number;

     function initialize(uint256 _number) public initializer {
        number = _number;
        __Ownable_init();
    }

    function increseNumber() public {
        number++;
    }
     function decreaseNumber() public {
        number--;
    }


    function _authorizeUpgrade(address) internal override onlyOwner {}

}

