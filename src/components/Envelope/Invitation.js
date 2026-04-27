import React, { useEffect, useRef, useState } from 'react'
import '../../style/Invitation.css'

const EVENTS = [
    {
        time: '15:20',
        title: 'Регистрация',
        desc: 'Приготовьте платочки для трогательного момента',
        align: 'left',
    },
    {
        time: '16:00',
        title: 'Банкет',
        desc: 'Время вкусной еды, танцев и развлечений',
        align: 'right',
    },
    {
        time: '22:00',
        title: 'Завершение',
        desc: 'Мы благодарны, что Вы провели с нами этот чудесный день!',
        align: 'left',
    },
]

const Invitation = () => {
    const containerRef = useRef(null)
    const lineRef = useRef(null)
    const heartRef = useRef(null)
    const titleRef = useRef(null)
    const locationRef = useRef(null)
    const itemRefs = useRef([])
    const [heartY, setHeartY] = useState(0)
    const [mapOpen, setMapOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current || !heartRef.current) return
            const rect = containerRef.current.getBoundingClientRect()
            const progress = Math.min(
                Math.max((-rect.top) / (rect.height - window.innerHeight * 0.5), 0),
                1
            )
            if (lineRef.current) {
                setHeartY(progress * lineRef.current.getBoundingClientRect().height)
            }
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.12 }
        )
            ;[titleRef, locationRef].forEach(r => r.current && observer.observe(r.current))
        itemRefs.current.forEach(r => r && observer.observe(r))
        return () => observer.disconnect()
    }, [])

    return (
        <div className='invitation-container' ref={containerRef}>

            <h1 className='invitation-title anim-title' ref={titleRef}>
                ПРОГРАММА ДНЯ
            </h1>

            <div className='invitation-body'>
                {/* Волнистая линия */}
                <div className='timeline-wrap' ref={lineRef}>
                    <svg className='timeline-svg' viewBox='0 0 60 900' preserveAspectRatio='none'>
                        <path
                            d='M30 0 C60 150, 0 300, 30 450 C60 600, 0 750, 30 900'
                            stroke='#1a1a1a' strokeWidth='1.2' fill='none' strokeLinecap='round'
                        />
                    </svg>
                    <div className='heart-scroll' ref={heartRef} style={{ top: `${heartY}px` }}>
                        <HeartIcon />
                    </div>
                </div>

                {/* События */}
                <div className='events-list'>
                    {EVENTS.map((ev, i) => (
                        <div
                            key={i}
                            className={`event-item event-${ev.align} anim-item`}
                            ref={el => itemRefs.current[i] = el}
                            style={{ '--delay': `${i * 0.18}s` }}
                        >
                            <span className='event-time'>{ev.time}</span>
                            <p className='event-title'>{ev.title}</p>
                            <p className='event-desc'>{ev.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── ЛОКАЦИЯ ── */}
            <div className='location-section anim-location' ref={locationRef}>
                <h2 className='location-heading'>ЛОКАЦИЯ</h2>

                <p className='location-address'>
                    Ресторан "Хан Ордо "<br />
                    Улица Кулбаева, 39а, с. Ала-Бука, Ала-Букинский район, Джалал-Абадская область,<br />
                </p>

                <button className='map-btn' onClick={() => setMapOpen(p => !p)}>
                    КАРТА&nbsp;&nbsp;→
                </button>

                <div className={`map-wrapper${mapOpen ? ' map-open' : ''}`}>
                    {mapOpen && (
                        <iframe
                            title="map"
                            className="map-iframe"
                            src="https://www.google.com/maps?q=41.399406,71.479724&z=17&output=embed"
                            allowFullScreen
                        />
                    )}
                </div>
            </div>

        </div>
    )
}

const HeartIcon = () => (
    <svg viewBox='0 0 48 44' fill='none' className='heart-svg-icon'>
        <path
            d='M24 40 C24 40 4 27 4 14 C4 8.5 8.5 4 14 4 C17.8 4 21 6.2 24 9.5 C27 6.2 30.2 4 34 4 C39.5 4 44 8.5 44 14 C44 27 24 40 24 40Z'
            fill='#1a1a1a'
        />
        <line x1='16' y1='14' x2='22' y2='20' stroke='white' strokeWidth='1.2' strokeLinecap='round' />
        <line x1='20' y1='11' x2='28' y2='19' stroke='white' strokeWidth='1.2' strokeLinecap='round' />
        <line x1='25' y1='10' x2='32' y2='17' stroke='white' strokeWidth='1.2' strokeLinecap='round' />
        <line x1='13' y1='18' x2='18' y2='23' stroke='white' strokeWidth='1.2' strokeLinecap='round' />
        <line x1='29' y1='14' x2='35' y2='20' stroke='white' strokeWidth='1.2' strokeLinecap='round' />
    </svg>
)

export default Invitation