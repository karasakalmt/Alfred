const { ethers, upgrades } = require("hardhat");
// test contract source -> https://blog.logrocket.com/using-uups-proxy-pattern-upgrade-smart-contracts/

const SLICES = 8;
async function main() {
 const Pizza = await ethers.getContractFactory("Pizza");

 console.log("Deploying Pizza...");

 const pizza = await upgrades.deployProxy(Pizza, [SLICES], {
   initializer: "initialize",
 });
 await pizza.deployed();

 console.log("Pizza deployed to:", pizza.address);
}

main();