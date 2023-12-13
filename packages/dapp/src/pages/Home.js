import Main from '../layouts/Main'
import EssayContent from '../components/Essay'
import HighlightModal from '../components/HighlightModal'

const Home = () => {
  return (
    <Main>
      <div className='flex flex-col items-center mx-auto pb-32 bg-white'>
        <HighlightModal />
        <EssayContent />
      </div>
    </Main>
  )
}

export default Home
