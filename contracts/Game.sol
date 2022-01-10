pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "./models/Game.sol";
import "./NFT.sol";

import "hardhat/console.sol";

contract CryptoFacesGame is ERC721, GameModel {

    string private constant nameOfToken = "CryptoFaces";
    string private constant symbolOfToken = "CFS";

    event CharacterNFTMinted(address sender, uint256 tokenId, uint256 cryptoFaceIndex, Character character);

    Character[] defaultCharacters;
    CryptoFacesNFT private nft;

    constructor(
        CryptoFacesNFT _nft,
        string[] memory characterNames,
        string[] memory characterDescriptions,
        string[] memory characterImages
    ) payable ERC721(nameOfToken, symbolOfToken) {
        console.log("CryptoFacesGame initializing...");

        nft = _nft;

        // Initialize the game with default characters
        for (uint i = 0; i < characterNames.length; i++) {
            Character memory character = Character({
            cryptoFaceIndex : i,
            name : characterNames[i],
            description : characterDescriptions[i],
            imageURI : characterImages[i],
            legendaryHypeLevel : 0,
            hypeLevel : 1,
            hypeValue : 10
            });

            defaultCharacters.push(character);

            console.log("Done initializing %s w/, img %s", character.name, character.imageURI);
        }
        console.log("Game initialized :)");
    }

    function mintCharacterNFT(uint characterIndex) external {
        require(
            characterIndex >= 0 && characterIndex < defaultCharacters.length,
            "Character index out of bounds."
        );

        Character memory character = defaultCharacters[characterIndex];

        uint256 tokenId = nft.mintNFT(character);

        emit CharacterNFTMinted(msg.sender, tokenId, characterIndex, character);
    }

    function getDefaultCharacters() public view returns (Character[] memory)  {
        return defaultCharacters;
    }

    function getTotalNFTMinted() public view returns (uint256) {
        return nft.getTotalCollection();
    }

    function getOwnedCharacters() public view returns (Character[] memory) {
        address ownerAddress = msg.sender;

        return nft.getOwnerNFTs(ownerAddress);
    }

}
