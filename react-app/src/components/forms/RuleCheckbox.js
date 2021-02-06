import React, { useEffect, useState } from 'react';
import { changeProperty } from '../../store/canvas'
import { useDispatch, useSelector } from 'react-redux';

//This component creates a -/input/+ box for the canvas property specified in props
const RulecheckBox = ({property}) => {
    const canvasSettings = useSelector(state => state.canvas)
    const dispatch = useDispatch()
    const [checked, setChecked] = useState(false)

    const toggleChecked = (e) => {
        const checkedTrue = e.target.checked
        const newRuleSet = {...canvasSettings.ruleset}
        newRuleSet[property] = checkedTrue
        dispatch(changeProperty({ruleset: newRuleSet}))
        setChecked(e.target.checked)
    }

    return (
        <div>
            <label htmlFor={property}></label>
            <input name={property} type='checkbox' value={checked} checked={checked} onClick={toggleChecked}/>
        </div>
    );
}

export default RulecheckBox;
