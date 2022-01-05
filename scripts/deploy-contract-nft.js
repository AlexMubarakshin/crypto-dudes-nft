const {ethers} = require('hardhat');

const contractName = 'CryptoFacesNFT';

exports.deploy = async (tokenName, tokenSymbol) => {
    // Compiling our Smart Contract.
    const contractFactory = await ethers.getContractFactory(contractName);

    // Deploy our contract to the local blockchain.
    const contract = await contractFactory.deploy(tokenName, tokenSymbol);

    console.log(`💪 Deploying ${contractName} contract...`);

    await contract.deployed();

    return contract;
};
