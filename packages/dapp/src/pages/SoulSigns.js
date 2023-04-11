import HorizontalSpace from '../components/common/HorizontalSpace'
import { useConnect } from 'wagmi'
import Main from '../layouts/Main'
import SignedOnNfts from '../components/SoulSigns/SignedOnNfts'
import NftCard from '../components/SoulSigns/NftCard'
import { useEffect, useState } from 'react'
import { highlightNfts } from '../utils/fetchNfts'
import {opensea} from '../utils/constants'

const SoulSigns = () => {
  const { activeConnector } = useConnect()
  const [signatures, setSignatures] = useState([])
  const [chainId, setChainId] = useState()

  useEffect(() => {
    const f = async () => {
      setChainId(await activeConnector.getChainId())
    }
    if (activeConnector) f()
  }, [activeConnector])

  useEffect(() => {
    const f = async () => {
      setSignatures(await highlightNfts())
    }
    f()
  }, [])
  return (
    <Main>
      <div className='flex flex-col gap-y-4 p-8'>
        <div className='text-5xl font-volkhorn text-left'>
          Signatures
        </div>
        <div className='text-lg font-volkhorn'>
          We display only a selection of signs here. Follow the links to view them all.
        </div>
        {
          activeConnector && (
            <>
              <SignedOnNfts />
              <HorizontalSpace />
            </>
          )
        }
        {/* ALL HIGHLIGHT NFTS */}
        <div className='text-xl font-volkhorn'>
          Signature NFTs
        </div>
        <div className='flex flex-row overflow-y-visible overflow-x-scroll gap-6'>
          {
            signatures.map((nft, k) => (
              <NftCard
                start={nft.start}
                end={nft.end}
                ethAddress={nft.steward}
                id={nft.id}
                key={k}
                isCanvas
              />
            ))
          }
          <ViewMore
            url={opensea.chainIdToCollectionSlug(chainId).sig}
            text='View collection on Opensea'
          />
        </div>
      </div>
    </Main>
  )
}

const ViewMore = ({ url, text }) => {
  return (
    <a
      className='
      text-center no-underline font-volkhorn font-normal bg-gray-100 rounded-lg min-w-[14rem] max-w-[14rem] scale-95 hover:scale-100 ease-in-out duration-200 flex flex-row items-center cursor-pointer text-xl
    ' href={url} target='_blank' rel='noreferrer'
    >
      <div className='mx-10'>
        {text}
      </div>
    </a>
  )
}

export default SoulSigns
