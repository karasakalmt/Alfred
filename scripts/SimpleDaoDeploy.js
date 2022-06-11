const { ethers, upgrades } = require("hardhat");

async function main() {
 const SimpleDao = await ethers.getContractFactory("SimpleDao");

 console.log("Deploying SimpleDao...");

 const adress = "0xB168541CE1aC46588154Bd0Ed36907Bf05F16E28";

 const simpleDao = await SimpleDao.deploy(adress);


 await simpleDao.deployed();

 console.log("SimpleDao deployed to:", simpleDao.address);
}

main();

