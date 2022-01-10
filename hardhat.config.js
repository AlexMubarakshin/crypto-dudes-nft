require('dotenv').config();

require("@nomiclabs/hardhat-ethers");

const ALCHEMY_API_KEY = process.env.API_URL
const RINKEBY_PRIVATE_KEY = process.env.PRIVATE_KEY

module.exports = {
    solidity: "0.8.0",
    defaultNetwork: "rinkeby",
    networks: {
        hardhat: {},
        rinkeby: {
            url: ALCHEMY_API_KEY,
            accounts: [`0x${RINKEBY_PRIVATE_KEY}`],
            gas: 10000000
        }
    },
}
