import React, { useState, useEffect } from "react";
import "../../style/Invitationscreen.css";
import palaceDay from "../../images/photo_2026-04-27_03-43-50.jpg";
import palaceNight from "../../images/photo_2026-04-27_03-55-54.jpg";

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
          <h1 className="hero-names">
            Нуриза <span className="hero-amp">&amp;</span> Сыймык
          </h1>
        </div>
      </div>
    </div>
  );
};

export default InvitationScreen;
