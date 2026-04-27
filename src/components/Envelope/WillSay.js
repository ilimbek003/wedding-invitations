import React, { useEffect, useRef, useState } from 'react'
import '../../style/WillSay.css'
import img from "../../images/1.png"

const WEDDING_DATE = new Date('2026-05-16T12:00:00')

function getTimeLeft() {
    const now = new Date()
    const diff = WEDDING_DATE - now
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    return { days, hours, minutes, seconds }
}

const WillSay = () => {
    const [time, setTime] = useState(getTimeLeft())
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)
    const timerRef = useRef(null)
    const imgRef = useRef(null)

    useEffect(() => {
        const interval = setInterval(() => setTime(getTimeLeft()), 1000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        )
            ;[titleRef, subtitleRef, timerRef, imgRef].forEach(r => r.current && observer.observe(r.current))
        return () => observer.disconnect()
    }, [])

    const pad = (n) => String(n).padStart(2, '0')

    return (
        <div className='willsay-container'>
            {/* Фоновое изображение с шёлком */}
            <img src={img} alt="" className='willsay-bg-img' ref={imgRef} />

            {/* Контент */}
            <div className='willsay-content'>
                <div className='willsay-top'>
                    <p className='willsay-title animate-fade-right' ref={titleRef}>Мы скажем</p>
                    <p className='willsay-subtitle animate-fade-left' ref={subtitleRef}>через...</p>
                </div>

                {/* Таймер */}
                <div className='willsay-timer animate-fade-up' ref={timerRef}>
                    <div className='timer-block'>
                        <span className='timer-num'>{time.days}</span>
                        <span className='timer-label'>дней</span>
                    </div>
                    <span className='timer-sep'>:</span>
                    <div className='timer-block'>
                        <span className='timer-num'>{pad(time.hours)}</span>
                        <span className='timer-label'>часов</span>
                    </div>
                    <span className='timer-sep'>:</span>
                    <div className='timer-block'>
                        <span className='timer-num'>{pad(time.minutes)}</span>
                        <span className='timer-label'>минут</span>
                    </div>
                    <span className='timer-sep'>:</span>
                    <div className='timer-block'>
                        <span className='timer-num'>{pad(time.seconds)}</span>
                        <span className='timer-label'>секунд</span>
                    </div>
                </div>
            </div>
            <img src={img} alt="" className='willsay-bg-img img-ref' ref={imgRef} />
        </div>
    )
}

export default WillSay