const { ethers, upgrades } = require("hardhat");


async function main() {
 const ProxyTest = await ethers.getContractFactory("ProxyTest");

 console.log("Deploying ProxyTest...");

 let number = 12;

 const proxyTest = await upgrades.deployProxy(ProxyTest, [number], {
   initializer: "initialize",
 });
 await proxyTest.deployed();

 console.log("ProxyTest deployed to:", proxyTest.address);
}

main();