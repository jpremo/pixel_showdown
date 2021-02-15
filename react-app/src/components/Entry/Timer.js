import React, { useEffect, useState } from 'react';
import { isPast, getTime } from 'date-fns'
import { updateImage } from '../canvas/aws'
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
//Component used to wrap elements that should be displayed in a modal; hidden prop is used to specify the property that
//checks whether the modal should be visible
const Timer = ({ endTime }) => {
    const [hidden, setHidden] = useState(true)
    const [int, setInt] = useState(null)
    const [timeString, setTimeString] = useState('')
    const [deleteInterval, setDeleteInterval] = useState(false)
    const canvasSettings = useSelector(state => state.canvas)
    const post = useSelector(state => state.posts.competitionPage)
    const history = useHistory()
    const getTimeString = () => {
        let currentTime = getTime(new Date())
        let finalTime = getTime(new Date(endTime))
        let timeRemaining = finalTime - currentTime;
        let minutes = Math.floor(timeRemaining / 60000)
        let seconds = Math.floor((timeRemaining - 60000 * minutes) / 1000)
        seconds = String(seconds)
        seconds = seconds.length === 1 ? '0' + seconds : seconds;
        minutes = String(minutes)
        minutes = minutes.length === 1 ? '0' + minutes : minutes;
        let time = `Time Remaining: ${minutes}:${seconds}`
        setTimeString(time)
        return timeRemaining
    }

    const updateTime = () => {
        if (isPast(endTime)) {

            setHidden(true)
            return null
        } else {
            setHidden(false)
            getTimeString()
            let i = setInterval(async () => {
                let timeRemaining = getTimeString()

                if (timeRemaining < 0) {
                    setTimeString('Time Remaining: 00:00')
                    setDeleteInterval(true)
                }
            }, 1000)
            setInt(i)
        }
    }

    useEffect(() => {
        updateTime()
    }, [])

    useEffect(() => {
        const submit = async () => {
            if(deleteInterval) {
                clearInterval(int)
                const info = await updateImage(canvasSettings)
                history.push(`/competitions/${post.id}`)
            }
        }
        submit()
    }, [deleteInterval])

    if (hidden) {
        return null
    }

    return (
        <div className='timer-box'>
            {timeString}
        </div>
    );
}

export default Timer;
