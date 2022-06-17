// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import {ERC721Tradable} from "./base/ERC721Tradable.sol";
import { Counters } from "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

//           ,,_
//        zd$$??=
//      z$$P? F:`c,                _
//     d$$, `c'we&&i           ,=caRe
//    $$$$ sign,?888i       ,=P"2?us"
//     $" " ?$$$,?888.    ,-''`>, bee
//      $'joy,?$$,?888   ,h' "I$'J$e
//       ... `?$$$,"88,`$$h  88love'd$"
//     d$PP""?-,"?$$,?8h`$$,,88'$Q42"
//     ?,,_`=4c,?=,"?ye$s`?E2$'? '
//        `""?==""=-"" `""-`'_,,,,
//            .eco?qualiJC,-,"=?
//                      """=='?"

contract SignatureNFT is ERC721Tradable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    error NotAuthorized();

    struct Highlight {
        uint16 start;
        uint16 end;
    }
    // maps tokenId to the start and end of the highlighted text
    mapping(uint256 => Highlight) public selection;

    // stores IPFS gateway, in case it ever changes
    string public gateway = "https://ipfs.io/ipfs/";

    // stores hash of image generator app
    string public imgHash = "QmYHGGTbqwFtfLFhhAKojVbmJwkVMNyqrniG9HLL1PYpyD";

    // stores an arweave backup of the image generator for the external url metadata
    string public backup = "https://arweave.net/xCAQvetmPzPIv7Ro3qwdutcfoHdUwJP5fmjU57tC0SY";

    //stores a reference to the final essay text
    string public essay = "https://arweave.net/wmn665qjC5J58QyFvaSJNEUpCmss1rfF-1b6xbTsxp4";

    // A Kernel address for proper attribution
    address public creator;

    event NewSignature(address signer, uint256 indexed tokenId, uint16 start, uint16 end);

    modifier onlyCreator() {
        if (msg.sender != creator) {
            revert NotAuthorized();
        }
        _;
    }

    constructor(address _proxyRegistryAddress, address _creator)
        ERC721Tradable("Signature Economies", "SIGN", _proxyRegistryAddress)
    {
        creator = _creator;
    }

    /**
     * @notice Link to contract metadata
     */
    function contractURI() 
        external 
        pure 
        returns (string memory) 
    {
        return
            "https://arweave.net/hh7ANFDf_LvzktqhwOzMkIaOlvdh_T2_WQRY1kQsc1Y";
    }

    /** @notice          Set the royalties for the whole contract. Our intention is to set it to 10% in perpetuity.
     *  @param recipient the royalties recipient - will always be pr1s0nart, for regulatory reasons.
     *  @param value     royalties value (between 0 and 10000)
     */
    function setRoyalties(address recipient, uint256 value)
        external
        onlyCreator
    {
        _setRoyalties(recipient, value);
    }

    /**
     * @notice      mints a unique NFT from some user-selected piece of text (which we make into an image & store in Arweave)
     * @param start the word index the chosen highlight starts on
     * @param end   the word index where the chosen highlight ends
     */
    function mintSelected(uint16 start, uint16 end) 
        external 
    {
        // The 510 character limit here is an arbitrary limit of our p5.js rendering script. We have to draw the line somewhere,
        // so long as you remember that this is merely a convention, waiting to be transcended.
        require(start < end && start >= 0 && end <= 13083 && end - start <= 463, "Invalid index");
        uint256 newTokenId = _tokenIdCounter.current();
        selection[newTokenId] = Highlight(start, end);
        _safeMint(creator, msg.sender, newTokenId);
        _tokenIdCounter.increment();

        emit NewSignature(msg.sender, newTokenId, start, end);
    }

    /**
     * @notice   this overrides the usual tokenURI to return base64 encoded metadata and, in particular, an animation_url rather than an
     *           image field, because that is how secondary marketplaces will display the image generated by our little React img generator
     *           living immutably on IPFS.
     * @param id the tokenId for which we are querying the metadata
     */
    function tokenURI(uint256 id) 
        public 
        view 
        override 
        returns (string memory) 
    {
      require(_exists(id), "not exist");
      Highlight memory highlight = selection[id];
      string memory image = string(abi.encodePacked(gateway,imgHash,'/#',Strings.toString(highlight.start),'-',Strings.toString(highlight.end)));
      string memory url = string(abi.encodePacked(backup,'/#',Strings.toString(highlight.start),'-',Strings.toString(highlight.end)));

      return
          string(
              abi.encodePacked(
                'data:application/json;base64,',
                Base64.encode(
                    bytes(
                          abi.encodePacked(
                              '{"name":"Signature NFT #',Strings.toString(id),'","description":"A unique sign of our times, selected to represent increasingly significant money in this infinite game we are playing together. As you consider these unique symbols, remember that wealth truly means having enough to share.","external_url":"',url,'","animation_url":"',image,'"}'
                          )
                        )
                    )
              )
          );
    }

    /**
     * @notice in case the IPFS gateway ever goes down and we need to move to another, more local, solution
     */
    function updateGateway(string memory newGateway) 
        external
        onlyCreator
    {
        gateway = newGateway;
    }
}