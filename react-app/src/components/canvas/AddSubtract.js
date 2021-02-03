import React, {useState} from 'react';
import { changeProperty } from '../../store/canvas'
import { useDispatch, useSelector } from 'react-redux';


const AddSubtract = ({ property, min, max, title }) => {
    const canvasSettings = useSelector(state => state.canvas)
    const dispatch = useDispatch()
    const [value, setValue] = useState(canvasSettings[property])


    const alterVal = (newVal) => {
        newVal = Number(newVal)
        if(newVal < min) {
            setValue(String(min))
            return min
        } else if(newVal > max) {
            setValue(String(max))
            return max
        } else {
            setValue(String(newVal))
            return newVal
        }
    }
    const add = () => {
        const val = alterVal(Number(value) + 1)
        const obj = {}
        obj[property] = val
        dispatch(changeProperty(obj))
    }

    const subtract = () => {
        const val = alterVal(Number(value) - 1)
        const obj = {}
        obj[property] = val
        dispatch(changeProperty(obj))
    }

    const setProperty = (e) => {
        const val = alterVal(Number(e.target.value))
        const obj = {}
        obj[property] = val
        dispatch(changeProperty(obj))
    }

    const blurSelf = (e) => {
        if(e.key == 'Enter') {
            e.target.blur()
        }
    }

    return (
        <div className='add-subtract'>
            <h3 className='add-subtract-title'>{title}</h3>
            <button className='canvas-button' onClick={subtract}>-</button>
            <input className='canvas-input' type='number' value={value} onChange={(e) => setValue(e.target.value)} onKeyPress={blurSelf} onBlur = {setProperty}/>
            <button className='canvas-button' onClick={add}>+</button>
        </div>
    );
}

export default AddSubtract;
