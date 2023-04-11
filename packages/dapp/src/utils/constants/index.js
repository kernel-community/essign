import { abis } from "./abi"

export const isDev = false

export const addresses =  {
  chainIdToContractAddresses: (chainId) => {
    switch (chainId) {
      case 5:
        return {
          signatureFund: '0xd96644cBaD732D4021A60d82710BDC6AA50F7A81',
          signatureNFT: '0x495AB49F0a79B212f02F1183200B21d9C0F3AA36'
        }
      case 1337:
        return {
          signatureFund: '0xd96644cBaD732D4021A60d82710BDC6AA50F7A81',
          signatureNFT: '0x495AB49F0a79B212f02F1183200B21d9C0F3AA36'
        }
      default:
        return {
          signatureFund: '0x779982C042E3038D6dbEC81Ce09643E1AE8Cdec1',
          signatureNFT: '0xd9B6206D7001AEdC02CeA223D4E905fF3AD77e8c'
        }
    }
  },
  seals: "SuPXgNnLyr_X4FR-a9M3jTloVH9wZnN334g9ToxyNZU"
}
export {abis}
export const arweave = {
  appName: isDev ? "Kernel-Signature-Economies-Staging": "Kernel-Signature-Economies"
}
export const etherscan = {
  chainIdToUrl: (id) => {
    switch (id) {
      case 5: return 'https://rinkeby.etherscan.io'
      case 1: return 'https://etherscan.io'
      default: return 'https://etherscan.io'
    }
  }
}
export const graph = {
  baseURL: isDev ? 'https://api.studio.thegraph.com/query/24825/sign-eco/0.0.7': 'https://api.studio.thegraph.com/query/24825/signature-economies/0.0.1'
}
export const opensea = {
  chainIdToUrl: (id) => {
    switch (id) {
      case 5: return 'https://testnets.opensea.io/assets'
      case 1: return 'https://opensea.io/assets/ethereum'
      default: return 'https://testnets.opensea.io/assets/'
    }
  },
  chainIdToCollectionSlug: (id) => {
    switch (id) {
      case 5: return {
        seals: 'https://testnets.opensea.io/collection/signature-fund-2uiw9cnuki',
        sig: 'https://testnets.opensea.io/collection/signature-nfts-zcv8rnfntv'
      }
      case 1: return {
        seals: 'https://opensea.io/collection/signature-fund',
        sig: 'https://opensea.io/collection/signature-nfts-v2'
      }
      default: return {
        seals: 'https://opensea.io/collection/signature-fund',
        sig: 'https://opensea.io/collection/signature-nfts-v2'
      }
    }
  }
}
export const twitter = {
  shareIntent: 'https://twitter.com/intent/tweet?text=',
  shareContent: `This new kind of essay on signatures from @KERNEL0x suggests ownership may be moving from control to care, from possession to reciprocity.

See my signs & make your own beautiful, eternal mark with me at https://sign.kernel.community`
}
export const weaver = {
  endpoint: 'https://staging.sign.kernel.community/rpc/sign'
}
