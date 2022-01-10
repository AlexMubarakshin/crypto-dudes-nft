const {ethers} = require('hardhat');

const contractName = 'Marketplace';

exports.deploy = async (nftContract) => {
    const contractFactory = await ethers.getContractFactory(contractName);

    const contract = await contractFactory.deploy(nftContract.address);

    console.log(`💪 Deploying ${contractName} contract...`);

    await contract.deployed();

    return contract;
};
