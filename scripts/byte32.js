const ethers = require('ethers')
const bytes32 = require('bytes32')
const utils = ethers.utils
// https://www.npmjs.com/package/bytes32
const inBytes = utils.formatBytes32String("test"); 

console.log(inBytes);

console.log(bytes32({ input: '0x7465737400000000000000000000000000000000000000000000000000000000' }));
