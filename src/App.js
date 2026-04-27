import React, { useState, useRef, useEffect } from 'react'
import EnvelopeScreen from './components/Envelope/EnvelopeScreen'
import All from './components/Envelope/all'
import music from "./media/music/music.mp3"

const App = () => {
  const [screen, setScreen] = useState('envelope')
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const handleFirstClick = () => {
      audioRef.current.play()
      setPlaying(true)
      document.removeEventListener('click', handleFirstClick)
    }
    document.addEventListener('click', handleFirstClick)
    return () => document.removeEventListener('click', handleFirstClick)
  }, [])

  const toggleMusic = (e) => {
    e.stopPropagation()
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setPlaying(!playing)
  }

  return (
    <>
      {screen === 'envelope' && (
        <EnvelopeScreen onOpen={() => setScreen('invitation')} />
      )}
      {screen === 'invitation' && (
        <All onBack={() => setScreen('envelope')} />
      )}

      <button onClick={toggleMusic} style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '50%',
        width: '52px',
        height: '52px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        transition: 'all 0.3s ease',
      }}>
        {playing ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M11 5L6 9H2v6h4l5 4V5z" fill="rgba(180,140,90,0.9)" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="rgba(180,140,90,0.9)" strokeWidth="2" strokeLinecap="round" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="rgba(180,140,90,0.9)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M11 5L6 9H2v6h4l5 4V5z" fill="rgba(180,140,90,0.5)" />
            <line x1="23" y1="9" x2="17" y2="15" stroke="rgba(180,140,90,0.7)" strokeWidth="2" strokeLinecap="round" />
            <line x1="17" y1="9" x2="23" y2="15" stroke="rgba(180,140,90,0.7)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      <audio ref={audioRef} src={music} loop />
    </>
  )
}

export default App