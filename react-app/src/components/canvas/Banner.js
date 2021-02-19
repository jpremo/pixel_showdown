import React, { useEffect, useState } from 'react';

const Banner = ({ text, timeLimit=null, setter }) => {
    const [timer, setTimer] = useState(null)
    const timeout = () => {
        if (timer) {
            clearTimeout(timer)
            setTimer(null)
        }

        if (timeLimit) {
            const tim = setTimeout(() => {
                setter(null)
            }, timeLimit*1000)
            setTimer(tim)
        }
    }

    useEffect(() => {
        timeout()
    }, [text])

    if (text) {
        return (
            <div className='banner-wrapper'>
                <div className='banner'>
                    {text}
                </div>
            </div>
        );
    }
    return null
}

export default Banner;
