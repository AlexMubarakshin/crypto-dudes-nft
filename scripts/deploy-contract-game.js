const {ethers} = require('hardhat');

const contractName = 'CryptoFacesGame';

const CHARACTERS = {
    default: {
        name: 'Dude',
        description: 'Just a plain dude',
        imageURI: '',
    }
};

exports.characters = CHARACTERS;

exports.deploy = async (nftContract) => {
    const contractFactory = await ethers.getContractFactory(contractName)

    const contract = await contractFactory.deploy(
        nftContract.address,
        [CHARACTERS.default.name],
        [CHARACTERS.default.description],
        [CHARACTERS.default.imageURI],
    );

    console.log(`💪 Deploying ${contractName} contract...`);

    await contract.deployed();

    return contract;
}
