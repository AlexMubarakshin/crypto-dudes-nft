const {getContractBalance, getAccountBalance} = require('./utils');

const {
    characters,
    deploy: deployGameContact
} = require('./deploy-contract-game')
const {deploy: deployNFTContract} = require('./deploy-contract-nft')

const TOKEN_NAME = 'CryptoFaces';
const TOKEN_SYMBOL = 'CFS';

const main = async () => {
    console.log('😎\n');

    const [owner] = await hre.ethers.getSigners();

    console.log('🏠 Owner address:', owner.address);
    console.log('💰 Account balance:', await getAccountBalance(owner));

    const nftContract = await deployNFTContract(TOKEN_NAME, TOKEN_SYMBOL);
    console.log('✌️  NFT contact deployed %s', nftContract.address);

    const gameContract = await deployGameContact(nftContract);
    console.log('✌️  Game contact deployed %s', gameContract.address);

    console.log('📇 Game contract balance:', await getContractBalance(gameContract.address));
    console.log('📇 NFT contract balance:', await getContractBalance(nftContract.address));

    console.log('💰 Account balance:', await getAccountBalance(owner));
    //
    const countCharacters = Object.keys(characters).length;
    // Mint NFTs for characters.
    for (let i = 0; i < countCharacters; i++) {
        // Mint a NFT.
        const txn = await gameContract.mintCharacterNFT(i);
        await txn.wait();
        console.log(`✌️  Minted NFT for character #${i + 1}`);
    }

    console.log(`🤙 Number of NFTs minted: ${await gameContract.getTotalNFTMinted()}`);
};

const initialize = async () => {
    try {
        await main();
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

initialize();
