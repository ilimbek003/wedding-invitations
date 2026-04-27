import React, { useEffect, useRef } from 'react'
import '../../style/Guests.css'

const MAY_2026 = {
    monthName: 'МАЙ 2026',
    startDay: 5,
    totalDays: 31,
    highlighted: 16, 
}

const WEEKDAYS = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

const Guests = () => {
    const titleRef = useRef(null)
    const textRef = useRef(null)
    const calRef = useRef(null)
    const heartRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) e.target.classList.add('visible')
                })
            },
            { threshold: 0.15 }
        )
        ;[titleRef, textRef, calRef].forEach((r) => r.current && observer.observe(r.current))
        return () => observer.disconnect()
    }, [])

    // Строим сетку дней
    const cells = []
    // пустые ячейки до первого дня
    for (let i = 0; i < MAY_2026.startDay; i++) cells.push(null)
    for (let d = 1; d <= MAY_2026.totalDays; d++) cells.push(d)
    // дополняем до кратности 7
    while (cells.length % 7 !== 0) cells.push(null)

    const weeks = []
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))

    return (
        <div className='guests-container'>
            <h1 className='guests-title animate-from-top' ref={titleRef}>
                ДОРОГИЕ ГОСТИ!
            </h1>

            <p className='guests-text animate-from-left' ref={textRef}>
                В нашей жизни произойдет очень важное событие&nbsp;– наша свадьба!
                Мы верим и надеемся, что этот день станет красивым началом долгой и счастливой жизни.
            </p>

            <div className='calendar animate-from-bottom' ref={calRef}>
                <h2 className='calendar-month'>{MAY_2026.monthName}</h2>

                <div className='calendar-grid'>
                    {WEEKDAYS.map((d) => (
                        <div key={d} className='cal-weekday'>{d}</div>
                    ))}

                    {weeks.map((week, wi) =>
                        week.map((day, di) => {
                            const isHighlighted = day === MAY_2026.highlighted
                            return (
                                <div
                                    key={`${wi}-${di}`}
                                    className={`cal-day${isHighlighted ? ' highlighted' : ''}${!day ? ' empty' : ''}`}
                                >
                                    {isHighlighted ? (
                                        <span className='heart-cell' ref={heartRef}>
                                            <HeartSVG />
                                            <span className='heart-number'>{day}</span>
                                        </span>
                                    ) : (
                                        day || ''
                                    )}
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    )
}

const HeartSVG = () => (
    <svg
        className='heart-svg'
        viewBox='0 0 44 44'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M22 36 C22 36 6 25 6 14.5 C6 9.8 9.8 6 14.5 6 C17.5 6 20.1 7.6 22 10 C23.9 7.6 26.5 6 29.5 6 C34.2 6 38 9.8 38 14.5 C38 25 22 36 22 36Z'
            stroke='#1a1a1a'
            strokeWidth='1.8'
            fill='none'
        />
    </svg>
)

export default Guests