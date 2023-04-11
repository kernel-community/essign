import Main from '../layouts/Main'
import FootNotes from '../components/Footnotes'
import EssayContent from '../components/Essay'
import HighlightModal from '../components/HighlightModal'
import HorizontalRule from '../components/common/HorizontalRule'

const Home = () => {
  return (
    <Main>
      <div className='flex flex-col items-center mx-auto pb-32 bg-white'>
        <HighlightModal />
        <EssayContent />
        <HorizontalRule />
        <FootNotes />
      </div>
    </Main>
  )
}

export default Home
