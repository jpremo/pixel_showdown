import React from 'react';
import { format, formatDistance, isPast, addSeconds, getTime} from 'date-fns'

//Component used to wrap elements that should be displayed in a modal; hidden prop is used to specify the property that
//checks whether the modal should be visible
const Timer = ({ endTime }) => {
    const [hidden, setHidden] = true
    const updateTime = () => {
        if (isPast(endTime)) {
            setHidden(true)
            return null
        } else {
            setHidden(false)
            let currentTime = getTime(new Date())
            let finalTime = getTime(newDate(endTime))
            let timeRemaining = finalTime-endTime;
        }
    }

    if (hidden) {
        return null
    }

    return (
        <div className='timer-box'>

        </div>
    );
}

export default Timer;
