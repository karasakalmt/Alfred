const { ethers, upgrades } = require("hardhat");

const PROXY = "0xD93Fe80cFD6a95620FA284Ab8bCa683a33Af1BD1";

async function main() {
 const ProxyTestV2 = await ethers.getContractFactory("ProxyTestV2");
 console.log("Upgrading ProxyTest...");
 await upgrades.upgradeProxy(PROXY, ProxyTestV2);
 console.log("ProxyTest upgraded successfully");
}

main();