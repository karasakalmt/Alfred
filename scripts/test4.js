

const { ethers, upgrades } = require("hardhat");

async function main() {
    const PizzaV2 = await ethers.getContractFactory("PizzaV2");

 console.log("Deploying SimpleDao...");

 const adress = "0xB168541CE1aC46588154Bd0Ed36907Bf05F16E28";

 const simpleDao = await PizzaV2.deploy();


 await simpleDao.deployed();

 console.log("SimpleDao deployed to:", simpleDao.address);
}

main();

