import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignedOn from './pages/SignedOn'
import SoulSigns from './pages/SoulSigns'
import SwitchNetworkModal from './components/SwitchNetwork'
import { SwitchNetworkProvider } from './contexts/SwitchNetwork'
import { HighlightProvider } from './contexts/Highlight'
import { LoadingProvider } from './hooks/useLoading'
import { ErrorProvider } from './hooks/useError'
import { ShareProvider } from './hooks/useShare'

const App = () => {
  return (
    <SwitchNetworkProvider>
      <LoadingProvider>
        <ErrorProvider>
          <HighlightProvider>
            <ShareProvider>
              <div>
                <SwitchNetworkModal />
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/signatures' element={<SoulSigns />} />
                  <Route path='/signed/:address' element={<SignedOn />} />
                </Routes>
              </div>
            </ShareProvider>
          </HighlightProvider>
        </ErrorProvider>
      </LoadingProvider>
    </SwitchNetworkProvider>
  )
}

export default App
