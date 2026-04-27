import React, { useEffect, useRef } from 'react'
import '../../style/Details.css'
import img from "../../images/1.png"

const ITEMS = [
    {
        align: 'left',
        icon: <GiftIcon />,
        label: 'ПОДАРКИ',
        text: 'Дорогие гости, приносите с собой веселье и радость в душе, а подарки — в конверте!',
    },
    {
        align: 'left',
        icon: <HeartIcon />,
        label: 'ГОРЬКО',
        text: 'От всего сердца просим вас воздержаться от криков "Горько!" и сохранить атмосферу уютного семейного праздника.',
    },
]

const Details = () => {
    const titleRef = useRef(null)
    const itemRefs = useRef([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.12 }
        )
        if (titleRef.current) observer.observe(titleRef.current)
        itemRefs.current.forEach(r => r && observer.observe(r))
        return () => observer.disconnect()
    }, [])

    return (
        <div className='details-container'>
            {/* Фоновый шёлк */}
            <img src={img} alt="" className='details-bg' />

            {/* Серая пилюля-карточка */}
            <div className='details-card'>
                <h2 className='details-title anim-fade-down' ref={titleRef}>ДЕТАЛИ</h2>

                <div className='details-list'>
                    {ITEMS.map((item, i) => (
                        <div
                            key={i}
                            className={`detail-row detail-${item.align} anim-row`}
                            ref={el => itemRefs.current[i] = el}
                            style={{ '--delay': `${i * 0.2}s` }}
                        >
                            {item.align === 'left' && (
                                <>
                                    <div className='detail-icon-wrap'>{item.icon}</div>
                                    <div className='detail-right'>
                                        <span className='detail-arrow'>←</span>
                                        <span className='detail-label'>{item.label}</span>
                                        <div className='detail-tooltip detail-tooltip-right'>
                                            {item.text}
                                        </div>
                                    </div>
                                </>
                            )}
                            {item.align === 'right' && (
                                <>
                                    <div className='detail-left'>
                                        <span className='detail-label'>{item.label}</span>
                                        <span className='detail-arrow'>→</span>
                                        <div className='detail-tooltip detail-tooltip-left'>
                                            {item.text}
                                        </div>
                                    </div>
                                    <div className='detail-icon-wrap'>{item.icon}</div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

/* ── SVG иконки ── */
function GiftIcon() {
    return (
        <svg viewBox='0 0 48 48' fill='none' className='icon-svg'>
            <rect x='10' y='20' width='28' height='22' rx='2' stroke='#aaa' strokeWidth='1.4' />
            <rect x='8' y='14' width='32' height='8' rx='2' stroke='#aaa' strokeWidth='1.4' />
            <line x1='24' y1='14' x2='24' y2='42' stroke='#aaa' strokeWidth='1.4' />
            <path d='M24 14 C24 14 18 8 14 10 C10 12 14 18 24 14Z' stroke='#aaa' strokeWidth='1.2' fill='none' />
            <path d='M24 14 C24 14 30 8 34 10 C38 12 34 18 24 14Z' stroke='#aaa' strokeWidth='1.2' fill='none' />
        </svg>
    )
}

function AgeIcon() {
    return (
        <svg viewBox='0 0 48 48' fill='none' className='icon-svg'>
            <circle cx='24' cy='24' r='18' stroke='#aaa' strokeWidth='1.4' />
            <text x='14' y='30' fontSize='13' fill='#aaa' fontFamily='serif'>18</text>
            <text x='30' y='20' fontSize='10' fill='#aaa' fontFamily='serif'>+</text>
        </svg>
    )
}

function HeartIcon() {
    return (
        <svg viewBox='0 0 48 48' fill='none' className='icon-svg'>
            <path
                d='M18 20 C18 20 10 15 10 22 C10 29 18 34 24 38 C30 34 38 29 38 22 C38 15 30 20 30 20'
                stroke='#aaa' strokeWidth='1.4' fill='none' strokeLinecap='round'
            />
            <path
                d='M14 18 C14 18 8 12 8 20 C8 28 16 33 22 37'
                stroke='#aaa' strokeWidth='1.2' fill='none' strokeLinecap='round'
            />
        </svg>
    )
}

export default Details