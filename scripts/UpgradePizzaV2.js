const { ethers, upgrades } = require("hardhat");
// test contract source -> https://blog.logrocket.com/using-uups-proxy-pattern-upgrade-smart-contracts/

const PROXY = "0x368853C9B1973E328700cE70fe3d2a1ebe6E1De1";

async function main() {
 const PizzaV2 = await ethers.getContractFactory("PizzaV2");
 console.log("Upgrading Pizza...");
 await upgrades.upgradeProxy(PROXY, PizzaV2);
 console.log("Pizza upgraded successfully");
}

main();