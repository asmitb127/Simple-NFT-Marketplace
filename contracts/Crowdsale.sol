pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

import "./HRC721.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/roles/MinterRole.sol";

contract NFTCrowdsale is MinterRole, ReentrancyGuard {
    using SafeMath for uint256;

    struct Item {
        uint256 index;
        uint256 tokenID;
        uint256 price;
        address tokenAddress;
        address payable owner;
        string url;
    }

    Item[] public items;
    mapping (uint256 => bool) public listedTokens;

    function listForSale(uint256 _tokenID,uint256 _price,address _tokenAddress,string memory _url) public nonReentrant {
        uint256 index = items.length;
        HRC721 hrc721 = HRC721(_tokenAddress);
        
        //Checks
        //Check if the owner of the token is msg.sender
        require(msg.sender == hrc721.ownerOf(_tokenID), "Crowdsale: Sender is not the owner of token");

        //Check if the token ID is already listed
        require(!listedTokens[_tokenID], "Crowdsale: Token is already listed");

        //Check if the crowdsale is approved for transfer for the tokenID
        require(
            address(this) == hrc721.getApproved(_tokenID),
            "Crowdsale: NFTCrowdsale is not provided approval to transfer");
        
        items.push(Item(index, _tokenID, _price, _tokenAddress, msg.sender, _url));
        listedTokens[_tokenID] = true;
    }

    function buyNFT(uint256 _index) public payable nonReentrant {

        //Check if required price is supplied
        require(msg.value == items[_index].price, "Crowdsale: Please pay the amount equal to price");

        //Transfer NFT to buyer
        HRC721 hrc721 = HRC721(items[_index].tokenAddress);
        hrc721.safeTransferFrom(items[_index].owner, msg.sender, items[_index].tokenID);

        //Send amount to owner
        items[_index].owner.transfer(msg.value);

        listedTokens[items[_index].tokenID] = false;
        
        //Remove item from list
        items[items.length-1].index = _index;
        items[_index] = items[items.length-1];
        items.length--;   
    }

    function getItemsList() external view returns(Item[] memory) {
        return items;
    }

    function totalItems() external view returns(uint256) {
        return items.length;
    }
}