import { allChains } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { providers } from 'ethers'
import { isDev } from './constants'

const chainId = isDev ? 5 : 1

const chains = allChains.filter(c => c.id === chainId)

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
