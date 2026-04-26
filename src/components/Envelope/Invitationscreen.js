import React, { useState, useEffect } from 'react'
import '../../style/Invitationscreen.css'

const InvitationScreen = ({ onBack }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Trigger entrance after mount
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  // Countdown to wedding
  const weddingDate = new Date('2025-09-14T16:00:00')
  const now = new Date()
  const diff = weddingDate - now
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
  const hours = Math.max(0, Math.floor((diff % (1000*60*60*24)) / (1000*60*60)))
  const mins = Math.max(0, Math.floor((diff % (1000*60*60)) / (1000*60)))

  return (
    <div className={`inv-page ${visible ? 'inv-in' : ''}`}>

      {/* Paper texture bg */}
      <div className="inv-bg" />

      {/* Floating petals */}
      <div className="inv-petals">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="inv-petal" style={{
            left: `${8 + i * 9}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${8 + (i % 4) * 2}s`,
          }} />
        ))}
      </div>

      {/* Back button */}
      <button className="inv-back" onClick={onBack}>
        ← Назад
      </button>

      {/* ── CARD ── */}
      <div className="inv-card">

        {/* Gold border lines */}
        <div className="inv-border" />
        <div className="inv-border-inner" />

        {/* Corner ornaments */}
        <div className="inv-corner inv-corner-tl">❧</div>
        <div className="inv-corner inv-corner-tr">❧</div>
        <div className="inv-corner inv-corner-bl">❧</div>
        <div className="inv-corner inv-corner-br">❧</div>

        {/* Content */}
        <div className="inv-content">

          {/* Top deco */}
          <div className="inv-row inv-deco-row" style={{ '--d': '0.1s' }}>
            <span className="inv-line" />
            <span className="inv-gem">◆</span>
            <span className="inv-line" />
          </div>

          {/* Together line */}
          <p className="inv-row inv-together" style={{ '--d': '0.2s' }}>
            Together with their families
          </p>

          {/* Names */}
          <div className="inv-row inv-names-wrap" style={{ '--d': '0.32s' }}>
            <h1 className="inv-name-first">Julia</h1>
            <div className="inv-ampersand-wrap">
              <span className="inv-amp">&amp;</span>
            </div>
            <h1 className="inv-name-second">Alexander</h1>
          </div>

          {/* Request line */}
          <p className="inv-row inv-request" style={{ '--d': '0.45s' }}>
            request the honour of your presence<br/>
            at the celebration of their marriage
          </p>

          {/* Divider */}
          <div className="inv-row inv-deco-row inv-divider-row" style={{ '--d': '0.55s' }}>
            <span className="inv-line" />
            <span className="inv-heart">♡</span>
            <span className="inv-line" />
          </div>

          {/* Date & Time */}
          <div className="inv-row inv-datetime" style={{ '--d': '0.65s' }}>
            <div className="inv-date-block">
              <span className="inv-date-label">Дата</span>
              <span className="inv-date-value">14 сентября 2025</span>
            </div>
            <div className="inv-date-dot">·</div>
            <div className="inv-date-block">
              <span className="inv-date-label">Время</span>
              <span className="inv-date-value">16:00</span>
            </div>
          </div>

          {/* Venue */}
          <div className="inv-row inv-venue-block" style={{ '--d': '0.75s' }}>
            <span className="inv-venue-label">Место проведения</span>
            <span className="inv-venue-name">The Grand Hall</span>
            <span className="inv-venue-address">Санкт-Петербург, Дворцовая наб., 4</span>
          </div>

          {/* Dress code */}
          <div className="inv-row inv-dresscode" style={{ '--d': '0.85s' }}>
            <span className="inv-dresscode-label">Дресс-код</span>
            <span className="inv-dresscode-value">Black Tie · Вечерний наряд</span>
          </div>

          {/* Countdown */}
          <div className="inv-row inv-countdown" style={{ '--d': '0.95s' }}>
            <div className="inv-countdown-item">
              <span className="inv-count-num">{days}</span>
              <span className="inv-count-label">дней</span>
            </div>
            <div className="inv-countdown-sep">:</div>
            <div className="inv-countdown-item">
              <span className="inv-count-num">{hours}</span>
              <span className="inv-count-label">часов</span>
            </div>
            <div className="inv-countdown-sep">:</div>
            <div className="inv-countdown-item">
              <span className="inv-count-num">{mins}</span>
              <span className="inv-count-label">минут</span>
            </div>
          </div>

          {/* RSVP */}
          <div className="inv-row inv-rsvp-wrap" style={{ '--d': '1.1s' }}>
            <p className="inv-rsvp-text">Пожалуйста, подтвердите присутствие до 1 августа 2025</p>
            <div className="inv-rsvp-btns">
              <button className="inv-btn inv-btn-yes">✓ Буду</button>
              <button className="inv-btn inv-btn-no">✕ Не смогу</button>
            </div>
          </div>

          {/* Bottom deco */}
          <div className="inv-row inv-deco-row" style={{ '--d': '1.2s' }}>
            <span className="inv-line" />
            <span className="inv-gem">◆</span>
            <span className="inv-line" />
          </div>

          {/* Brand footer */}
          <div className="inv-row inv-footer" style={{ '--d': '1.3s' }}>
            The Digital Yes
          </div>

        </div>{/* inv-content */}
      </div>{/* inv-card */}

    </div>
  )
}

export default InvitationScreen