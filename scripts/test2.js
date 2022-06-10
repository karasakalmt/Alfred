const { ethers, upgrades } = require("hardhat");

const PROXY = "0x5Bf01c2Ceda843A743997b466a89776c5b54675b";

async function main() {
 const PizzaV2 = await ethers.getContractFactory("PizzaV2");
 console.log("Upgrading Pizza...");
 await upgrades.upgradeProxy(PROXY, PizzaV2);
 console.log("Pizza upgraded successfully");
}

main();