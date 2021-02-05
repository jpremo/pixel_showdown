import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProperty } from '../../store/canvas'
import { rgbaToHex } from "./color_functions";

//This component allows for the title of an image to be altered
function TitleCard() {
    const dispatch = useDispatch()
    const canvasSettings = useSelector(state => state.canvas)
    const [value, setValue] = useState(canvasSettings.title) //Current value of input

    useEffect(() => {
        setValue(canvasSettings.title)
    }, [canvasSettings.title])

    //Sets redux value to current input value at end of change (blur)
    const sendTitle = () => {
        let title = value;
        if (!title) {
            title = 'Title'
            setValue('Title')
        }
        dispatch(changeProperty({ title: title }))
    }

    return (
        <div className='title-wrapper'>
            <div className='color-circle-background'>
                <div className='color-circle' style={{ backgroundColor: `${rgbaToHex(canvasSettings.color)}` }}>
                </div>
            </div>
            <input className='title-text' maxLength='50' value={value} onChange={(e) => setValue(e.target.value)} onBlur={sendTitle} />
            <div className='color-circle-background'>
                <div className='color-circle' style={{ backgroundColor: `${rgbaToHex(canvasSettings.color)}` }}>
                </div>
            </div>
        </div>
    );
}
export default TitleCard;
