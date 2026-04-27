import React, { useEffect, useRef } from 'react'
import InvitationScreen from './Invitationscreen'
import Beautiful from './Beautiful'
import Guests from './Guests'
import WillSay from './WillSay'
import Invitation from './Invitation'
import Details from './Details'
import DressCode from './DressCode'
import Application from './Application'
import Video from "../../media/video.mp4"
import "../../style/Beautiful.css"
import image from "../../images/photo.png.webp"
import img from "../../images/img.png .webp"

const All = () => {
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
        <div>
            <InvitationScreen />
            <Beautiful />
            <Guests />
            <WillSay />
            <Invitation />
            <Details />
            <DressCode />
            <Application />
            <div className='container'>
                <div className='flex-center'>
                    <div className='header-block' ref={dateRef}>
                        <h1 className='names-title animate-fade-down'>Сыймык жана Нуриза</h1>
                        <p className='wedding-date animate-fade-down delay-1'>16.05.26</p>
                    </div>

                    <div className='relative' ref={cardRef}>
                        <div className='media-card animate-scale-in'>
                            <video autoPlay muted loop playsInline className='video'>
                                <source src={Video} type="video/mp4" />
                            </video>
                            <div className='corner-tl' />
                            <div className='corner-br' />
                        </div>

                        <div className='tn-atom'>
                            <img className='image' src={image} alt="фото пары" ref={photoRef} />
                        </div>
                        <img className='img' src={img} alt='' />
                    </div>

                    <div className='text-section' ref={sectionRef}>
                        <p className='text-animate from-left' ref={textLeftRef}>
                            <span className='highlight'>УРМАТТУУ БИР ТУУГАНДАР,
                                КУДА-КУДАГЫЙЛАР, ДОСТОР,
                                КЛАССТАШТАР, КЕСИПТЕШТЕР,
                                КОШУНАЛАР ЖАНА ААЛЫ
                                СЫЙЛУУ КОНОКТОР!</span> Сиз(дер)ди уулубуз Сыймык
                            менен келинибиз Нуриза
                            үйлөнүү тоюна арналган
                            салтанаттуу дасторконуубузга
                            кадырлуу конок болууга
                            чакырабыз.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default All