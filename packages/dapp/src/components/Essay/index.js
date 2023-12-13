import HighlightPop from 'react-highlight-pop'
import Content from './Content'
import MintPop from './MintPop'

const EssayContent = () => {
  return (
    <div>
      <HighlightPop popoverItems={(itemClass) => <MintPop itemClass={itemClass} />}>
        <Content />
      </HighlightPop>
    </div>
  )
}

export default EssayContent
