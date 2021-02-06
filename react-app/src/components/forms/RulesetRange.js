import React, { useEffect, useState } from 'react';
import { changeProperty } from '../../store/canvas'
import { useDispatch, useSelector } from 'react-redux';
import RuleAddSubtract from './RuleAddSubtract'
//This component creates a -/input/+ box for the canvas property specified in props
const RulesetRange = ({ property, min, max, defaultValue, title}) => {
    const canvasSettings = useSelector(state => state.canvas)
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const [validate, setValidated] = useState(false)
    const [defaultValueState, setDefaultValueState] = useState(defaultValue)
    const [maxState, setMaxState] = useState(max)
    const [minState, setMinState] = useState(min)
    useEffect(() => {
        if(!canvasSettings.ruleset[property]) {
            const obj = {ruleset:{...canvasSettings.ruleset}}
            obj.ruleset[property] = {
                min,
                max,
                defaultValue
            }
            dispatch(changeProperty(obj))
        }
        setLoaded(true)
    }, [])

    useEffect(() => {
        debugger
        if(loaded && validate) {
            const obj = {}
            const initRules = canvasSettings.ruleset[property]
            obj[property] = {...initRules}
            if(obj[property]['max'] < obj[property]['min']) {
                obj[property]['max'] = obj[property]['min']
            }
            if(obj[property]['defaultValue'] < obj[property]['min']) {
                obj[property]['defaultValue'] = obj[property]['min']
            }
            if(obj[property]['defaultValue'] > obj[property]['max']) {
                obj[property]['defaultValue'] = obj[property]['max']
            }
            setDefaultValueState(obj[property]['defaultValue'])
            setMinState(obj[property]['min'])
            setMaxState(obj[property]['max'])
            // debugger
            const rulesetCopy = {...canvasSettings.ruleset}
            rulesetCopy[property] = obj
            dispatch(changeProperty({ruleset: rulesetCopy}))
            setValidated(false)
        }
    }, [validate])

    if(!loaded){
        return null
    }

    const defMax = canvasSettings.ruleset[property] && canvasSettings.ruleset[property]['max'] ? canvasSettings.ruleset[property]['max'] : max
    const defDefault = canvasSettings.ruleset[property] && canvasSettings.ruleset[property]['defaultValue'] ? canvasSettings.ruleset[property]['defaultValue'] : defaultValue
    const defMin = canvasSettings.ruleset[property] && canvasSettings.ruleset[property]['min'] ? canvasSettings.ruleset[property]['min'] : min
    return (
        <>
            <div>{title}</div>
            <RuleAddSubtract setValidated={setValidated} property={property} innerProperty='min' defaultValue={minState} max={maxState} min={minState} title='Min'/>
            <RuleAddSubtract setValidated={setValidated} property={property} innerProperty='defaultValue' defaultValue={defaultValueState} max={maxState} min={minState} title='Default Value'/>
            <RuleAddSubtract setValidated={setValidated} property={property} innerProperty='max' defaultValue={maxState} max={maxState} min={minState} title='Max'/>
        </>
    );
}

export default RulesetRange;
