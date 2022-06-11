const { ethers, upgrades } = require("hardhat");
// test contract source -> https://blog.logrocket.com/using-uups-proxy-pattern-upgrade-smart-contracts/
const PROXY = "0xB168541CE1aC46588154Bd0Ed36907Bf05F16E28";

async function main() {
 const PizzaV2 = await ethers.getContractFactory("PizzaV3");
 console.log("Upgrading Pizza...");
 await upgrades.upgradeProxy(PROXY, PizzaV2);
 console.log("Pizza upgraded successfully");
}

main();