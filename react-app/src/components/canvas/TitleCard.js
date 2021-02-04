import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProperty } from '../../store/canvas'

function TitleCard() {
    const dispatch = useDispatch()
    const canvasSettings = useSelector(state => state.canvas)
    const [value, setValue] = useState(canvasSettings.title)

    useEffect(() => {
        setValue(canvasSettings.title)
    }, [canvasSettings.title])

    const sendTitle = () => {
        let title = value;
        if(!title) {
            title = 'Title'
            setValue('Title')
        }
        dispatch(changeProperty({title: title}))
    }

    return (
        <div className='title-wrapper'>
            <input className='title-text' maxLength='50' value={value} onChange={(e) => setValue(e.target.value)} onBlur={sendTitle}/>
        </div>
    );
}
export default TitleCard;
