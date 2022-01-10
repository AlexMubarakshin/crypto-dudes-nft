pragma solidity ^0.8.0;

import "./models/Game.sol";
import "./NFT.sol";

contract Marketplace is GameModel {
    struct Offer {
        address payable seller;
        uint256 price;
        uint256 index;
        uint256 tokenId;
        bool active;
    }

    event MarketTransaction(string TxType, address owner, uint256 tokenId);

    CryptoFacesNFT private _nftContract;

    Offer[] offers;

    mapping(uint256 => Offer) tokenIdToOffer;

    mapping(uint256 => uint256) tokenIdToOfferId;

    function getContractAddress() external view returns (address){
        return address(this);
    }

    constructor(CryptoFacesNFT _nft){
        _nftContract = CryptoFacesNFT(_nft);
    }

    function getOffer(uint256 _tokenId) external view returns (address seller, uint256 price, uint256 index, uint256 tokenId, bool active){
        Offer storage offer = tokenIdToOffer[_tokenId];

        require(offer.active == true, "Marketplace: There is no active offer for this token");

        return (
        seller = offer.seller,
        price = offer.price,
        index = offer.index,
        tokenId = offer.tokenId,
        active = offer.active
        );
    }

    function getOffersIds() external view returns (uint256[] memory){
        uint256 numOfOffers = offers.length;

        if (numOfOffers == 0) {
            return new uint256[](0);
        }

        uint256[] memory listOfOffers = new uint256[](numOfOffers);

        for (uint i = 0; i < numOfOffers; i++) {
            listOfOffers[i] = offers[i].tokenId;
        }

        return listOfOffers;
    }

    function getOffers() external view returns (Offer[] memory) {
        uint256 numOfOffers = offers.length;

        Offer[] memory result = new Offer[](numOfOffers);
        for (uint256 i = 0; i < numOfOffers; i++) {
            result[i] = offers[i];
        }

        return result;
    }

    function ownerOfNft(address theAddress, uint256 theTokenId) internal view returns (bool){
        return (_nftContract.ownerOf(theTokenId) == theAddress);
    }

    function createOffer(uint256 _price, uint256 _tokenId) public {
        require(ownerOfNft(msg.sender, _tokenId), "You must own the nft you want to sell");
        require(tokenIdToOffer[_tokenId].active == false, "There is currently an active offer");

        _createOffer(_price, _tokenId, msg.sender);
    }

    function _createOffer(uint256 _price, uint256 _tokenId, address _seller) internal {
        Offer memory _offer = Offer({
        seller : payable(_seller),
        price : _price,
        index : offers.length,
        tokenId : _tokenId,
        active : true
        });

        tokenIdToOffer[_tokenId] = _offer;
        offers.push(_offer);

        emit MarketTransaction("Create offer", msg.sender, _tokenId);
    }

    function removeOffer(uint256 _tokenId) public {
        Offer memory offer = tokenIdToOffer[_tokenId];
        require(offer.seller == msg.sender, "You need to be the seller of that nft");

        _removeOffer(_tokenId, msg.sender);
    }

    function _removeOffer(uint256 _tokenId, address _seller) internal {
        uint256 targetIndex = tokenIdToOffer[_tokenId].index;
        uint256 lastIndex = offers.length - 1;

        if (lastIndex > 0) {
            offers[targetIndex] = offers[lastIndex];
            offers[targetIndex].index = targetIndex;
            tokenIdToOffer[offers[targetIndex].tokenId] = offers[targetIndex];
        }

        offers.pop();

        delete tokenIdToOffer[_tokenId];

        emit MarketTransaction("Remove offer", _seller, _tokenId);
    }

    function buyToken(uint256 _tokenId) external payable {
        Offer memory offer = tokenIdToOffer[_tokenId];
        require(msg.value == offer.price, "The price doesnt match");
        require(offer.seller != msg.sender, "Marketplace: Cannot by your own token!");
        require(offer.active == true, "No active orders");

        _buyToken(_tokenId, msg.sender);
    }

    function _buyToken(uint256 _tokenId, address _buyer) internal {
        Offer memory offer = tokenIdToOffer[_tokenId];
        address seller = offer.seller;
        uint256 price = offer.price;

        (bool success,) = payable(seller).call{value : price}("");

        require(success, "Marketplace: Failed to send funds to the seller");

        _nftContract.transferFrom(seller, _buyer, _tokenId);

        removeOffer(_tokenId);

        emit MarketTransaction("Buy", msg.sender, _tokenId);
    }
}
