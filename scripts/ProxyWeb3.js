

const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider("");      


const address = "0x368853C9B1973E328700cE70fe3d2a1ebe6E1De1";
const abi = [
  "function latestVersion() view returns (uint256)"
];

async function latestVersion() {
	const contract = new ethers.Contract(address, abi, provider);
	const result = await contract.functions.latestVersion();

	console.log("result", result[0].toNumber());
}

latestVersion();