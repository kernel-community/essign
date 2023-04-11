import { getAllHighlightNfts, getAllStewardNfts } from './graph'

const highlightNfts = async () => {
  const r = await getAllHighlightNfts()
  return cleanHighlightNfts(r)
}

const stewardNfts = async (address) => {
  const r = await getAllStewardNfts(address)
  return cleanStewardNfts(r)
}

const cleanStewardNfts = async (data) => {
  const allHighlights = cleanHighlightNfts(data?.signatureNft.map(d => {
    return {
      ...d,
      steward: data.id
    }
  }))
  return [allHighlights]
}

const cleanHighlightNfts = (data) => {
  if (!data) return []
  return data.map(d => {
    return {
      ...d,
      steward: d.steward.id ?? d.steward
    }
  })
}

export {
  highlightNfts,
  stewardNfts
}
