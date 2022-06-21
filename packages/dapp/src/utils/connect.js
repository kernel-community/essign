import { allChains } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { providers } from 'ethers'

const infuraId = process.env.INFURA_ID

// only rinkeby
const chains = allChains.filter(c => c.id === 4)

export const connectors = () => [
  new InjectedConnector({ chains })
]

export const Connector = {
  INJECTED: 0,
  WALLETCONNECT: 1
}

export const provider = ({ chainId }) => {
  if (chainId === 1337) {
    return new providers.JsonRpcProvider('http://localhost:8545')
  }
  return new providers.CloudflareProvider()
}

export const connectorStorageKey = 'sign.kernel.community'
