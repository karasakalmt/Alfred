// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";


pragma solidity ^0.8.4;

abstract contract UpgradeVersion is  UUPSUpgradeable {

mapping(uint => address) public versions;
uint256 public latestVersion;

uint256 public currentVersion;


 function changeVersion(uint256 version) external virtual  onlyProxy{

     currentVersion = version;
     _authorizeUpgrade(versions[version]);
     _upgradeToAndCallUUPS(versions[version], new bytes(0), false);
  
 }

 function addNewVersion(address newContract) public {
     latestVersion++;
     currentVersion = latestVersion;
     versions[latestVersion] = newContract;
   }
   

 function getContract(uint version) public view returns (address) {
     return versions[version];
}  

  function upgradeTo(address newImplementation) external override onlyProxy {
        this.addNewVersion(newImplementation);
        _authorizeUpgrade(newImplementation);
        _upgradeToAndCallUUPS(newImplementation, new bytes(0), false);
    }




}

