import React, { useEffect, useState } from 'react';
import { changeRuleset } from '../../store/canvas'
import { useDispatch, useSelector } from 'react-redux';
//This component creates a -/input/+ box for the canvas property specified in props
const RulesetRange2 = ({ property, title, initialMin=1, initialMax=100, initialDefault=1 }) => {
    const canvasSettings = useSelector(state => state.canvas)
    const dispatch = useDispatch()
    const overallMin = 1;
    const overallMax = 100;
    const [minValue, setMinValue] = useState(initialMin)
    const [maxValue, setMaxValue] = useState(initialMax)
    const [defaultValue, setDefaultValue] = useState(initialDefault)

    const [minValueTemp, setMinValueTemp] = useState(initialMin)
    const [maxValueTemp, setMaxValueTemp] = useState(initialMax)
    const [defaultValueTemp, setDefaultValueTemp] = useState(initialDefault)

    useEffect(() => {
        // const rulesetCopy = { ...canvasSettings.ruleset }
        const copy = {}
        const obj = {
            minValue,
            defaultValue,
            maxValue
        }
        copy[property] = obj;
        dispatch(changeRuleset(obj, property))
    }, [minValue, maxValue, defaultValue])

    const changeMin = (e) => {
        let val = Math.floor(Number(e.target.value))
        val = Math.min(val, overallMax)
        val = Math.max(val, overallMin)
        setMinValue(val)
        setMinValueTemp(val)
        if (val > maxValue) {
            setMaxValue(val)
            setMaxValueTemp(val)
        }

        if (val > defaultValue) {
            setDefaultValue(val)
            setDefaultValueTemp(val)
        }
    }

    const changeMax = (e) => {
        let val = Math.floor(Number(e.target.value))
        val = Math.min(val, overallMax)
        val = Math.max(val, overallMin)
        setMaxValue(val)
        setMaxValueTemp(val)

        if (val < minValue) {
            setMinValue(val)
            setMinValueTemp(val)
        }

        if (val < defaultValue) {
            setDefaultValue(val)
            setDefaultValueTemp(val)
        }
    }

    const changeDefault = (e) => {
        let val = Math.floor(Number(e.target.value))
        val = Math.min(val, overallMax)
        val = Math.max(val, overallMin)
        setDefaultValue(val)
        setDefaultValueTemp(val)

        if (val > maxValue) {
            setDefaultValue(maxValue)
            setDefaultValueTemp(maxValue)
        }

        if (val < minValue) {
            setDefaultValue(minValue)
            setDefaultValueTemp(minValue)
        }
    }

    const blurSelf = (e) => {
        if (e.key === 'Enter') {
            e.target.blur()
        }
    }

    return (
        <div className='ruleset-range-wrapper'>
            <h2>{title}</h2>
            <div className='ruleset-range'>
                <div className='ruleset-range-option'>
                    <div>Min</div>
                    <input type='number' value={minValueTemp} min='1' max='100'
                        onChange={(e) => setMinValueTemp(e.target.value)} onBlur={changeMin} onKeyPress={blurSelf} />
                </div>
                <div className='ruleset-range-option'>
                    <div>Default</div>
                    <input type='number' value={defaultValueTemp} min='1' max='100'
                        onChange={(e) => setDefaultValueTemp(e.target.value)} onBlur={changeDefault} onKeyPress={blurSelf}/>
                </div>
                <div className='ruleset-range-option'>
                    <div>Max</div>
                    <input type='number' value={maxValueTemp} min='1' max='100'
                        onChange={(e) => setMaxValueTemp(e.target.value)} onBlur={changeMax} onKeyPress={blurSelf}/>
                </div>
            </div>
        </div>
    );
}

export default RulesetRange2;
