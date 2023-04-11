# Meta Sign

A simply immutable image generator on IPFS.

## Get Started

```bash
yarn start
```

## Notes

It has been fun and games to figure out how to host a React app on IPFS that will return images dynamically in a way that OpenSea can read them.

The basic gist here is that we: 

1. Build this app
2. Upload the `build/` directory to IPFS using pinata 
3. Use the hash that is returned there, but `https://ipfs.is/ipfs/` rather than the pinata gateway, because it is severely rate-limited. Technically, we should use `ipfs://` as the "gateway" but have yet to test that across all marketplaces.
4. Put that gateway + hash in the contract
5. Deploy the contract
6. Mint an NFT and return base64 encoded json directly from the `tokenURI` function, specifying that it overrides the general ERC721 route.