// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./UpgradeVersion.sol";
pragma solidity ^0.8.4;


contract ProxyTest is  Initializable, UpgradeVersion, OwnableUpgradeable {
    
    uint256 public number;

     function initialize(uint256 _number) public initializer {
        number = _number;
        __Ownable_init();
    }

    function increseNumber() public virtual {
        number++;
    }
     function decreaseNumber() public virtual {
        number--;
    }


    function _authorizeUpgrade(address) internal override onlyOwner {}

}

