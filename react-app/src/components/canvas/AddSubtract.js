import React, {useState} from 'react';
import { changeProperty } from '../../store/canvas'
import { useDispatch, useSelector } from 'react-redux';


const AddSubtract = ({ property, min, max, title }) => {
    const canvasSettings = useSelector(state => state.canvas)
    const dispatch = useDispatch()
    const [value, setValue] = useState(canvasSettings[property])


    const alterVal = (newVal) => {
        if(newVal < min) {
            setValue(min)
        } else if(newVal > max) {
            setValue(max)
        } else {
            setValue(Number(newVal))
        }
    }
    const add = () => {
        alterVal(value + 1)
        const obj = {}
        obj[property] = canvasSettings[property] + 1
        dispatch(changeProperty(obj))
    }

    const subtract = () => {
        alterVal(value - 1)
        const obj = {}
        obj[property] = canvasSettings[property] - 1
        dispatch(changeProperty(obj))
    }

    const setProperty = (e) => {
        alterVal(e.target.value)
        const obj = {}
        obj[property] = value
        dispatch(changeProperty(obj))
    }

    return (
        <div>
            <h3>{title}</h3>
            <button className='canvas-button' onClick={subtract}>-</button>
            <input className='canvas-input' type='number' value={value} onChange={(e) => setValue(Number(e.target.value))} onBlur = {setProperty}/>
            <button className='canvas-button' onClick={add}>+</button>
        </div>
    );
}

export default AddSubtract;
