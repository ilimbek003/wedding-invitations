import React, { useEffect, useRef } from 'react'
import mutedVideo from '../../media/media.mp4'
import "../../style/Beautiful.css"
import image from "../../images/photo.png.webp"
import img from "../../images/img.png .webp"

const Beautiful = () => {
    const sectionRef = useRef(null)
    const textLeftRef = useRef(null)
    const textRightRef = useRef(null)
    const dateRef = useRef(null)
    const cardRef = useRef(null)
    const photoRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.15 }
        )

        const elements = [
            textLeftRef.current,
            textRightRef.current,
            dateRef.current,
            cardRef.current,
            photoRef.current,
        ]

        elements.forEach((el) => {
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    return (
        <div className='container'>
            <div className='flex-center'>
                <div className='header-block' ref={dateRef}>
                    <h1 className='names-title animate-fade-down'>Сыймык жана Нуриза</h1>
                    <p className='wedding-date animate-fade-down delay-1'>16.05.26</p>
                </div>

                <div className='relative' ref={cardRef}>
                    <div className='media-card animate-scale-in'>
                        <video autoPlay muted loop playsInline className='video'>
                            <source src={mutedVideo} type="video/mp4" />
                        </video>    
                        <div className='corner-tl' />
                        <div className='corner-br' />
                    </div>

                    <div className='tn-atom'>
                        <img className='image' src={image} alt="жуптун сүрөтү" ref={photoRef} />
                    </div>
                    <img className='img' src={img} alt='' />
                </div>

                <div className='text-section' ref={sectionRef}>
                    <p className='text-animate from-left' ref={textLeftRef}>
                        Бир <span className='highlight'>кереметтүү күн</span> келет.
                    </p>
                    <p className='text-animate from-right' ref={textRightRef}>
                        Бир заматта жана өмүр бою...
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Beautiful