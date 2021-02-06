import React, { useEffect, useState } from 'react';
import { changeProperty } from '../../store/canvas'
import { useDispatch, useSelector } from 'react-redux';
//This component creates a -/input/+ box for the canvas property specified in props
const RulesetRange2 = () => {
    const canvasSettings = useSelector(state => state.canvas)
    const dispatch = useDispatch()
    const overallMin = 1;
    const overallMax = 100;
    const [minValue, setMinValue] = useState(1)
    const [maxValue, setMaxValue] = useState(100)
    const [defaultValue, setDefaultValue] = useState(5)

    const changeMin = (e) => {
        let val = Math.floor(Number(e.target.value))
        val = Math.min(val, overallMax)
        val = Math.max(val, overallMin)
        setMinValue(val)
    }

    const changeMax = (e) => {
        let val = Math.floor(Number(e.target.value))
        val = Math.min(val, overallMax)
        val = Math.max(val, overallMin)
        setMaxValue(val)
    }

    const changeDefault = (e) => {
        let val = Math.floor(Number(e.target.value))
        val = Math.min(val, overallMax)
        val = Math.max(val, overallMin)
        setDefaultValue(val)
    }

    return (
        <>
            <input type='number' value={minValue} min='1' max='100' onChange={changeMin}/>
            <input type='number' value={defaultValue} min='1' max='100' onChange={changeDefault}/>
            <input type='number' value={maxValue} min='1' max='100' onChange={changeMax}/>
        </>
    );
}

export default RulesetRange2;
