import React from 'react'
import { mutedVideo } from '../../media/media.mp4'

const Beautiful = () => {
    return (
        <div>
            <video autoPlay muted loop>
                <source src={mutedVideo} />
            </video>
        </div>
    )
}

export default Beautiful