import React, { useState, useEffect } from "react";
import "../../style/Invitationscreen.css";
import palaceDay from "../../images/photo_2026-04-27_03-43-50.jpg";
import palaceNight from "../../images/photo_2026-04-27_03-55-54.jpg";

/* ── Twinkling stars ── */
const Stars = () => {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    r: Math.random() * 1.8 + 0.4,
    delay: Math.random() * 6,
    dur: 2 + Math.random() * 4,
  }));
  return (
    <svg
      className="night-stars"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      {stars.map((s) => (
        <circle
          key={s.id}
          cx={s.x}
          cy={s.y}
          r={s.r * 0.3}
          fill="white"
          opacity="0"
          style={{
            animation: `starTwinkle ${s.dur}s ${s.delay}s ease-in-out infinite`,
          }}
        />
      ))}
      <circle cx="85" cy="10" r="5.5" fill="#fff" opacity="0.92" />
    </svg>
  );
};

/* ── Fairy lights ── */
const FairyLights = () => (
  <svg
    className="fairy-lights-svg"
    viewBox="0 0 500 50"
    preserveAspectRatio="none"
  >
    {[0, 50, 100, 150, 200, 250, 300, 350, 400, 450].map((x, i) => (
      <g key={i}>
        <path
          d={`M${x} 8 Q${x + 25} 28 ${x + 50} 8`}
          stroke="rgba(255,215,90,0.5)"
          strokeWidth="0.8"
          fill="none"
        />
        <circle
          cx={x + 25}
          cy={28}
          r="3"
          fill="#FFD055"
          style={{
            filter: "drop-shadow(0 0 6px rgba(255,210,60,1))",
            animation: `bulbPulse ${1.7 + i * 0.28}s ${i * 0.18}s ease-in-out infinite`,
          }}
        />
      </g>
    ))}
  </svg>
);

const InvitationScreen = ({ onBack }) => {
  const [visible, setVisible] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const weddingDate = new Date("2025-09-14T16:00:00");
  const now = new Date();
  const diff = weddingDate - now;
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = Math.max(
    0,
    Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );
  const mins = Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));

  return (
    <div
      className={`inv-page ${visible ? "inv-in" : ""} ${dark ? "inv-dark" : "inv-light"}`}
    >
      <button className="inv-back" onClick={onBack}>
        ← Назад
      </button>

      <button
        className="theme-toggle"
        onClick={() => setDark((d) => !d)}
        aria-label="Сменить тему"
      >
        <div className="toggle-track">
          <span className="t-icon t-sun">☀</span>
          <span className="t-icon t-moon">☽</span>
          <div className="toggle-thumb" />
        </div>
      </button>

      {/* ══ HERO ══ */}
      <div className="hero-section">
        <img src={palaceDay} alt="day" className="palace-img palace-img-day" />
        <img
          src={palaceNight}
          alt="night"
          className={`palace-img palace-img-night ${dark ? "visible" : ""}`}
        />

        <div className="hero-overlay" />
        <div className="night-sky-layer">{dark && <Stars />}</div>
        <div className={`fairy-lights-wrap ${dark ? "visible" : ""}`}>
          <FairyLights />
        </div>

        <div className="hero-text">
          <p className="hero-subtitle">WE ARE GETTING MARRIED</p>
          <h1 className="hero-names">
            Julia <span className="hero-amp">&amp;</span> Alexander
          </h1>
          <p className="hero-date">14 СЕНТЯБРЯ 2025</p>
        </div>
      </div>

      {/* ══ CARD ══ */}
      <div className="inv-card">
        <div className="inv-border" />
        <div className="inv-border-inner" />
        <div className="inv-corner inv-corner-tl">❧</div>
        <div className="inv-corner inv-corner-tr">❧</div>
        <div className="inv-corner inv-corner-bl">❧</div>
        <div className="inv-corner inv-corner-br">❧</div>

        <div className="inv-content">
          <div className="inv-row inv-deco-row" style={{ "--d": "0.1s" }}>
            <span className="inv-line" />
            <span className="inv-gem">◆</span>
            <span className="inv-line" />
          </div>
          <p className="inv-row inv-together" style={{ "--d": "0.2s" }}>
            Together with their families
          </p>
          <div className="inv-row inv-names-wrap" style={{ "--d": "0.32s" }}>
            <h2 className="inv-name">Julia</h2>
            <div className="inv-ampersand-wrap">
              <span className="inv-amp">&amp;</span>
            </div>
            <h2 className="inv-name">Alexander</h2>
          </div>
          <p className="inv-row inv-request" style={{ "--d": "0.45s" }}>
            request the honour of your presence
            <br />
            at the celebration of their marriage
          </p>
          <div
            className="inv-row inv-deco-row inv-divider-row"
            style={{ "--d": "0.55s" }}
          >
            <span className="inv-line" />
            <span className="inv-heart">♡</span>
            <span className="inv-line" />
          </div>
          <div className="inv-row inv-datetime" style={{ "--d": "0.65s" }}>
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
          <div className="inv-row inv-venue-block" style={{ "--d": "0.75s" }}>
            <span className="inv-venue-label">Место проведения</span>
            <span className="inv-venue-name">The Grand Hall</span>
            <span className="inv-venue-address">
              Санкт-Петербург, Дворцовая наб., 4
            </span>
          </div>
          <div className="inv-row inv-dresscode" style={{ "--d": "0.85s" }}>
            <span className="inv-dresscode-label">Дресс-код</span>
            <span className="inv-dresscode-value">
              Black Tie · Вечерний наряд
            </span>
          </div>
          <div className="inv-row inv-countdown" style={{ "--d": "0.95s" }}>
            {[
              { n: days, l: "дней" },
              { n: hours, l: "часов" },
              { n: mins, l: "минут" },
            ].map((item, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="inv-countdown-sep">:</div>}
                <div className="inv-countdown-item">
                  <span className="inv-count-num">{item.n}</span>
                  <span className="inv-count-label">{item.l}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="inv-row inv-rsvp-wrap" style={{ "--d": "1.1s" }}>
            <p className="inv-rsvp-text">
              Пожалуйста, подтвердите присутствие до 1 августа 2025
            </p>
            <div className="inv-rsvp-btns">
              <button className="inv-btn inv-btn-yes">✓ Буду</button>
              <button className="inv-btn inv-btn-no">✕ Не смогу</button>
            </div>
          </div>
          <div className="inv-row inv-deco-row" style={{ "--d": "1.2s" }}>
            <span className="inv-line" />
            <span className="inv-gem">◆</span>
            <span className="inv-line" />
          </div>
          <div className="inv-row inv-footer" style={{ "--d": "1.3s" }}>
            The Digital Yes
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationScreen;
