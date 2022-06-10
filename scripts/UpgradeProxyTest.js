const { ethers, upgrades } = require("hardhat");

const PROXY = "0x94b3cff9Aa1a951baF0C15574adc9D3668958A03";

async function main() {
 const ProxyTestV2 = await ethers.getContractFactory("ProxyTestV2");

 console.log("Upgrading ProxyTest...");
 await upgrades.upgradeProxy(PROXY, ProxyTestV2);
 console.log("ProxyTest upgraded successfully");
}

main();