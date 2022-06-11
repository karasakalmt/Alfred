

const { ethers, upgrades } = require("hardhat");

async function main() {
    const PizzaV2 = await ethers.getContractFactory("PizzaV2");

 console.log("Deploying New Pizza...");



 const pizza = await PizzaV2.deploy();


 await pizza.deployed();

 console.log("Pizza deployed to:", pizza.address);
}

main();

