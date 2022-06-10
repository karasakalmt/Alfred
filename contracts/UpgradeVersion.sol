// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

pragma solidity ^0.8.4;


abstract contract UpgradeVersion is  UUPSUpgradeable {

mapping(uint => address) public versions;
uint256 public latestVersion;


 function changeVersion(uint256 version) external virtual  onlyProxy{
     this.upgradeTo(versions[version]);
     
 }

 function addNewVersion(address newContract) public {
     latestVersion++;
     versions[latestVersion] = newContract;
   }
   

 function getContract(uint version) public view returns (address) {
     return versions[version];
}  

   function upgradeTo(address newImplementation) external virtual override onlyProxy {
        this.addNewVersion(newImplementation);
        _authorizeUpgrade(newImplementation);
        _upgradeToAndCallUUPS(newImplementation, new bytes(0), false);
    }




}

