require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");

require("dotenv").config();
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
const ETH_API_KEY = process.env.ETHERSCAN_API_KEY;

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.10",
   settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
    gorli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
    mumbai: {
      url: `https://speedy-nodes-nyc.moralis.io/${process.env.MORALIS_API_KEY}/polygon/mumbai`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },



  etherscan: {
    apiKey:  process.env.ETHERSCAN_API_KEY
    
  }
}
