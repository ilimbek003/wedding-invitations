import React, { useState } from 'react'
import EnvelopeScreen from './components/Envelope/EnvelopeScreen'
import All from './components/Envelope/all'

const App = () => {
  const [screen, setScreen] = useState('envelope') 

  return (
    <>
      {screen === 'envelope' && (
        <EnvelopeScreen onOpen={() => setScreen('invitation')} />
      )}
      {screen === 'invitation' && (
        <All onBack={() => setScreen('envelope')} />
      )}
    </>
  )
}

export default App