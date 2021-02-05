import React, { useEffect, useState } from 'react';
import { changeProperty } from '../../store/canvas'
import { useDispatch, useSelector } from 'react-redux';

//This component creates a -/input/+ box for the canvas property specified in props
const AddSubtract = ({ property, min, max, title, loops }) => {
    const canvasSettings = useSelector(state => state.canvas)
    const dispatch = useDispatch()
    const [value, setValue] = useState(canvasSettings[property])

    useEffect(() => {
        setValue(canvasSettings[property])
    }, [canvasSettings[property]])

    //3 functions below are used in changing the value and setting it in redux state
    const alterVal = (newVal) => {
        newVal = Number(newVal)
        if (newVal < min) {
            if (!loops) {
                setValue(String(min))
                return min
            } else {
                setValue(String(max))
                return max
            }
        } else if (newVal > max) {
            if (!loops) {
                setValue(String(max))
                return max
            } else {
                setValue(String(min))
                return min
            }
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

    //Changes redux store for canvas at key specified in props
    const setProperty = (e) => {
        const val = alterVal(Number(e.target.value))
        const obj = {}
        obj[property] = val
        dispatch(changeProperty(obj))
    }

    //blurs element when enter is pressed; used in onKeyPress event
    const blurSelf = (e) => {
        if (e.key === 'Enter') {
            e.target.blur()
        }
    }

    const addClass = canvasSettings[property] === max ? ' invalid-selection' : ''
    const subtractClass = canvasSettings[property] === min ? ' invalid-selection' : ''

    return (
        <div>
            <h3 className='add-subtract-title'>{title}</h3>
            <div className='add-subtract'>
                <button className={'canvas-button' + subtractClass} onClick={subtract}><i className="fas fa-minus"></i></button>
                <input className='canvas-input' type='number' value={value} onChange={(e) => setValue(e.target.value)} onKeyPress={blurSelf} onBlur={setProperty} />
                <button className={'canvas-button' + addClass} onClick={add}><i className="fas fa-plus"></i></button>
            </div>
        </div>
    );
}

export default AddSubtract;
