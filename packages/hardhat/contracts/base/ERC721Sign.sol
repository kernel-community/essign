// SPDX-License-Identifier: MIT

/// @title ERC721Sign
/// Based on work done originally by Dynamic Culture
/// https://github.com/Dynamiculture/neurapunks-contract/blob/d250e955453773566ba54e64fdea39ee221bc3d4/contracts/ERC721Tradable.sol

pragma solidity 0.8.7;

import { ERC721 } from "./ERC721.sol";
import { ERC721URIStorage } from "./ERC721URIStorage.sol";

contract ERC721Sign is ERC721URIStorage {

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
