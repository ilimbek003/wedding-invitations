import React, { useState } from 'react'
import '../../style/EnvelopeScreen.css'

const EnvelopeScreen = ({ onOpen }) => {
  const [phase, setPhase] = useState('idle') // idle | opening | done

  const handleClick = () => {
    if (phase !== 'idle') return
    setPhase('opening')
    setTimeout(() => {
      setPhase('done')
      onOpen && onOpen()
    }, 1400)
  }

  return (
    <div className={`env-page ${phase}`}>

      <div className="env-bg" />

      <div className="env-scene" onClick={handleClick}>
        <div className={`env-wrapper ${phase}`}>

          {/* Drop shadow */}
          <div className="env-shadow" />

          {/* Main envelope body */}
          <div className="env-body">

            <div className="env-paper" />
            <div className="env-tri env-tri-left" />
            <div className="env-tri env-tri-right" />
            <div className="env-tri env-tri-bottom" />

            {/* Top flap */}
            <div className={`env-flap ${phase !== 'idle' ? 'open' : ''}`}>
              <div className="env-flap-paper" />
              <div className="env-flap-crease" />
            </div>

            {/* Wax Seal */}
            <div className={`env-seal-wrap ${phase !== 'idle' ? 'seal-gone' : ''}`}>
              <div className="env-seal">
                <div className="seal-outer-ring" />
                <div className="seal-disc">
                  <svg className="seal-crest" viewBox="0 0 180 200" fill="none">
                    <path d="M90 15 C60 15 30 30 20 60 L20 130 C20 165 55 185 90 195 C125 185 160 165 160 130 L160 60 C150 30 120 15 90 15Z"
                      fill="none" stroke="rgba(180,140,40,0.7)" strokeWidth="2.5"/>
                    <path d="M90 22 C63 22 36 35 27 63 L27 128 C27 160 60 178 90 188 C120 178 153 160 153 128 L153 63 C144 35 117 22 90 22Z"
                      fill="none" stroke="rgba(180,140,40,0.5)" strokeWidth="1.5"/>
                    <path d="M70 18 Q90 5 110 18 Q100 12 90 14 Q80 12 70 18Z" fill="rgba(170,130,30,0.8)"/>
                    <path d="M80 8 Q90 2 100 8 L98 15 Q90 10 82 15Z" fill="rgba(160,120,20,0.7)"/>
                    <line x1="75" y1="6" x2="72" y2="0" stroke="rgba(170,130,30,0.7)" strokeWidth="1.5"/>
                    <line x1="90" y1="3" x2="90" y2="-3" stroke="rgba(170,130,30,0.7)" strokeWidth="1.5"/>
                    <line x1="105" y1="6" x2="108" y2="0" stroke="rgba(170,130,30,0.7)" strokeWidth="1.5"/>
                    <path d="M28 70 Q18 80 20 95 Q22 80 30 78Z" fill="rgba(160,120,20,0.6)"/>
                    <path d="M26 100 Q14 110 18 125 Q22 110 30 108Z" fill="rgba(160,120,20,0.5)"/>
                    <path d="M152 70 Q162 80 160 95 Q158 80 150 78Z" fill="rgba(160,120,20,0.6)"/>
                    <path d="M154 100 Q166 110 162 125 Q158 110 150 108Z" fill="rgba(160,120,20,0.5)"/>
                    <path d="M55 188 Q70 200 90 198 Q110 200 125 188" fill="none" stroke="rgba(160,120,20,0.7)" strokeWidth="2"/>
                    <path d="M45 182 Q50 195 60 196" fill="none" stroke="rgba(160,120,20,0.5)" strokeWidth="1.5"/>
                    <path d="M135 182 Q130 195 120 196" fill="none" stroke="rgba(160,120,20,0.5)" strokeWidth="1.5"/>
                    <ellipse cx="90" cy="108" rx="52" ry="62" fill="none" stroke="rgba(170,130,30,0.45)" strokeWidth="1.5"/>
                  </svg>
                  <div className="seal-monogram">JA</div>
                </div>
              </div>
            </div>

          </div>

          {/* Hint */}
          {phase === 'idle' && (
            <div className="env-hint">
              <div className="env-hint-arrow">↑</div>
              <span>Нажмите, чтобы открыть</span>
            </div>
          )}

        </div>
      </div>

    </div>
  )
}

export default EnvelopeScreen