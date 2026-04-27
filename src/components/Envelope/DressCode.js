import React, { useEffect, useRef, useState } from 'react'
import '../../style/DressCode.css'

import dress1 from '../../images/dress1.jpg'
import dress2 from '../../images/dress2.webp'
import dress3 from '../../images/dress3.jpg'
import dress4 from '../../images/dress4.jpeg'
import suit1 from '../../images/suit1.jpg'
import suit2 from '../../images/suit2.jpeg'
import suit3 from '../../images/dress4.jpeg'
import suit4 from '../../images/suit1.jpg'

const PALETTE = [
    { bg: '#b5906a', label: 'кою бежевый' },
    { bg: '#c9a882', label: 'бежевый' },
    { bg: '#e8d5b7', label: 'ачык бежевый' },
]

const WOMEN_SLIDES = [
    [dress1, dress2],
    [dress3, dress4],
]

const MEN_SLIDES = [
    [suit1, suit2],
    [suit3, suit4],
]

const DressCode = () => {
    const [isWomen, setIsWomen] = useState(true)
    const [slideIdx, setSlideIdx] = useState(0)
    const titleRef = useRef(null)
    const textRef = useRef(null)
    const paletteRef = useRef(null)
    const noteRef = useRef(null)
    const galleryRef = useRef(null)

    const slides = isWomen ? WOMEN_SLIDES : MEN_SLIDES
    const totalSlides = slides.length

    useEffect(() => { setSlideIdx(0) }, [isWomen])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.12 }
        )
            ;[titleRef, textRef, paletteRef, noteRef, galleryRef].forEach(r => r.current && observer.observe(r.current))
        return () => observer.disconnect()
    }, [])

    const prevSlide = () => setSlideIdx(p => (p - 1 + totalSlides) % totalSlides)
    const nextSlide = () => setSlideIdx(p => (p + 1) % totalSlides)

    return (
        <div className='dresscode-container'>
            <h1 className='dresscode-title anim-drop' ref={titleRef}>ДРЕСС-КОД</h1>

            <p className='dresscode-subtitle anim-fade-up' ref={textRef}>
                Биздин үйлөнүү тоюбуздун түс гаммасын колдосоңуздар, абдан ыраазы болобуз
            </p>

            <div className='palette anim-fade-up' ref={paletteRef}>
                {PALETTE.map((c, i) => (
                    <div
                        key={i}
                        className='palette-strip'
                        style={{ background: c.bg, animationDelay: `${0.1 + i * 0.12}s` }}
                    />
                ))}
            </div>

            <p className='dresscode-note anim-fade-up' ref={noteRef}>
                Урматтуу айымдар, бул күнү ак түс жалгыз келинчектин артыкчылыгы болуп кала берсе, абдан ыраазы болобуз.
            </p>

            <div className='toggle-wrap anim-fade-up' ref={galleryRef}>
                <button
                    className={`toggle-btn${!isWomen ? ' active' : ''}`}
                    onClick={() => setIsWomen(false)}
                    aria-label='Эркектер'
                />
                <div
                    className={`toggle-track${isWomen ? ' women' : ' men'}`}
                    onClick={() => setIsWomen(p => !p)}
                >
                    <div className='toggle-thumb' />
                </div>
                <button
                    className={`toggle-btn${isWomen ? ' active' : ''}`}
                    onClick={() => setIsWomen(true)}
                    aria-label='Аялдар'
                />
            </div>

            <div className='slider-outer'>
                <div
                    className='slider-track'
                    style={{ transform: `translateX(-${slideIdx * 100}%)` }}
                >
                    {slides.map((pair, i) => (
                        <div className='slide' key={i}>
                            <img src={pair[0]} alt='' className='slide-img' />
                            <img src={pair[1]} alt='' className='slide-img' />
                        </div>
                    ))}
                </div>

                {totalSlides > 1 && (
                    <>
                        <button className='slide-arrow slide-arrow-left' onClick={prevSlide}>‹</button>
                        <button className='slide-arrow slide-arrow-right' onClick={nextSlide}>›</button>
                    </>
                )}

                {totalSlides > 1 && (
                    <div className='slide-dots'>
                        {slides.map((_, i) => (
                            <span
                                key={i}
                                className={`dot${i === slideIdx ? ' active' : ''}`}
                                onClick={() => setSlideIdx(i)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default DressCode