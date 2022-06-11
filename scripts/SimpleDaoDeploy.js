const { ethers, upgrades } = require("hardhat");

async function main() {
 const SimpleDao = await ethers.getContractFactory("SimpleDao");

 console.log("Deploying SimpleDao...");

 const adress = "0x368853C9B1973E328700cE70fe3d2a1ebe6E1De1";

 const simpleDao = await SimpleDao.deploy(adress);


 await simpleDao.deployed();

 console.log("SimpleDao deployed to:", simpleDao.address);
}

main();

