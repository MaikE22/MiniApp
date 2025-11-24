// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NeonOrigins is ERC721, Ownable {
    uint256 public constant MAX_SUPPLY = 5001;
    uint256 public totalSupply;

    enum Rarity { Base, Neon, Aura, Cosmic }

    mapping(uint256 => Rarity) public tokenIdToRarity;

    constructor() ERC721("Neon Origins", "NEON") Ownable(msg.sender) {}

    function mint() public {
        require(totalSupply < MAX_SUPPLY, "Max supply reached");

        uint256 tokenId = totalSupply;
        _safeMint(msg.sender, tokenId);
        tokenIdToRarity[tokenId] = _getRandomRarity(tokenId);
        totalSupply++;
    }

    function _getRandomRarity(uint256 tokenId) private view returns (Rarity) {
        uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, tokenId)));
        uint256 percent = random % 100;

        if (percent < 1) {
            return Rarity.Cosmic; // 1%
        } else if (percent < 5) {
            return Rarity.Aura; // 4%
        } else if (percent < 29) {
            return Rarity.Neon; // 24%
        } else {
            return Rarity.Base; // 71%
        }
    }
}
