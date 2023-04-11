import { useState, useEffect } from 'react'
import Card from '../../layouts/Card'
import { useProvider } from 'wagmi'
import { addresses } from '../../utils/constants'
import { opensea } from '../../utils/constants'
import { useDisplayableAddress } from '../../hooks/useDisplayableAddress'
import { ReactP5Wrapper } from 'react-p5-wrapper'
import Canvas from '../HighlightModal/Canvas'
import Text from '../text'

const NftCard = ({
  ethAddress,
  id,
  isSeal = false,
  isCanvas = false,
  start = undefined,
  end = undefined,
  showAddress = true
}) => {
  const provider = useProvider()
  const [url, setUrl] = useState()
  const [text, setText] = useState('')

  const toDisplay = useDisplayableAddress(ethAddress)

  useEffect(() => {
    if (!isCanvas) return
    if ((start && end) || (start === 0 && end)) {
      const text = Text.substring(start, end)
      setText(text)
    }
  }, [start, end, isCanvas])

  useEffect(() => {
    const f = async () => {
      const { chainId } = await provider.getNetwork()
      const { signatureNFT } = addresses.chainIdToContractAddresses(chainId)
      const openseaUrl = opensea.chainIdToUrl(chainId)
      if (isCanvas) setUrl(`${openseaUrl}/${signatureNFT}/${id}`)
    }
    f()
  }, [id, provider, isSeal, isCanvas])

  if (isCanvas) {
    return (
      <Card toDisplay={toDisplay} url={url} showAddress={showAddress}>
        <ReactP5Wrapper
          sketch={Canvas}
          selectedText={text}
        />
      </Card>
    )
  }
}

export default NftCard
