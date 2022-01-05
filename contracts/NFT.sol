pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// Helper functions OpenZeppelin provides.
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./models/Game.sol";

// Helper we wrote to encode in Base64
import "./libraries/Base64.sol";

// Hardhat util for console output
import "hardhat/console.sol";

contract CryptoFacesNFT is ERC721URIStorage, GameModel {
    string constant description = "Blah blah blah, this is the NFT description";
    mapping(address => uint256) public holders;

    mapping(uint256 => Character) public characterNFTs;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event LegendaryLevelUpdated(uint256 tokenId, Character player);
    event LevelUpdated(uint256 tokenId, Character player);
    event InfoUpdated(uint256 tokenId, Character player);

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        console.log("NFT initialized!");
    }

    function getTotalCollection() public view returns (uint256) {
        return _tokenIds.current();
    }

    function mintNFT(Character memory character) public returns (uint256) {
        address owner = tx.origin;

        // Get current tokenId.
        uint256 tokenId = _tokenIds.current();

        // Save the NFT in the storage
        characterNFTs[tokenId] = Character({
        cryptoFaceIndex : tokenId,
        name : character.name,
        description : character.description,
        imageURI : character.imageURI,
        legendaryHypeLevel : character.legendaryHypeLevel,
        hypeLevel : character.hypeLevel,
        hypeValue : character.hypeValue
        });

        // Assigns the tokenId to the caller's wallet address.
        _safeMint(owner, tokenId);

        // Set the NFT's data
        //_setTokenURI(tokenId, jsonData);

        // Save NFT owner
        holders[owner] = tokenId;

        // Increment counter
        _tokenIds.increment();

        console.log("NFT minted by %s, tokenId: %s", owner, tokenId);

        return tokenId;
    }

    function getOwnerNFTs(address _owner) public view returns (Character[] memory) {
        Character[] memory result = new Character[](balanceOf(_owner));

        uint256 counter = 0;
        for (uint256 i = 0; i < _tokenIds.current(); i++) {
            if (ownerOf(i) == _owner) {
                result[counter] = characterNFTs[i];
                counter++;
            }
        }

        return result;
    }

    function getById(uint256 id) public view returns (Character memory) {
        return characterNFTs[id];
    }

    function upgradeLegendaryLevel(uint256 tokenId) external payable {
        require(ownerOf(tokenId) == msg.sender);

        Character storage player = characterNFTs[tokenId];

        require(player.hypeLevel == 300, 'You must have 300 level for upgrade to legendary');

        player.hypeLevel = 1;
        player.legendaryHypeLevel += 1;
        player.hypeValue += 5;

        emit LegendaryLevelUpdated(tokenId, player);
    }

    function upgradeFace(uint256 tokenId) external payable {
        require(ownerOf(tokenId) == msg.sender);

        Character storage player = characterNFTs[tokenId];

        require(player.hypeLevel < 300, 'You must to upgrade to legendary level, before an action');

        uint256 playerNextLevel = player.hypeLevel + player.hypeValue;

        console.log("Player prev level: %s, playerNextLevel: %s", player.hypeLevel, playerNextLevel);
        // Level up
        if ((playerNextLevel - player.hypeLevel) >= 1) {
            player.hypeValue += 1;
        }

        if (playerNextLevel > 300) {
            playerNextLevel = 300;
        }

        player.hypeLevel = playerNextLevel;

        emit LevelUpdated(tokenId, player);
    }

    function updateCharacterInfo(uint256 tokenId, string memory characterName, string memory characterDescription) external payable {
        require(ownerOf(tokenId) == msg.sender);
        require(bytes(characterName).length != 0);
        require(bytes(characterDescription).length != 0);

        Character storage player = characterNFTs[tokenId];

        player.name = characterName;
        player.description = characterDescription;

        emit InfoUpdated(tokenId, player);
    }
}
