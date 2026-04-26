import React, { useState } from 'react'
import EnvelopeScreen from './components/Envelope/EnvelopeScreen'
import InvitationScreen from './components/Envelope/Invitationscreen'

const App = () => {
  const [screen, setScreen] = useState('envelope') // 'envelope' | 'invitation'

  return (
    <>
      {screen === 'envelope' && (
        <EnvelopeScreen onOpen={() => setScreen('invitation')} />
      )}
      {screen === 'invitation' && (
        <InvitationScreen onBack={() => setScreen('envelope')} />
      )}
    </>
  )
}

export default App