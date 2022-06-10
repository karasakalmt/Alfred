// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./ProxyTest.sol";
pragma solidity ^0.8.4;


contract ProxyTestV2 is  ProxyTest {


  ///@dev returns the contract version
   function testVersion() external pure returns (uint256) {
       return 2;
   }



}

