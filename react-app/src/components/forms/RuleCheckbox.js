import React, { useEffect, useState } from 'react';
import { changeRuleset } from '../../store/canvas'
import { useDispatch, useSelector } from 'react-redux';

//This component creates a -/input/+ box for the canvas property specified in props
const RulecheckBox = ({property, title}) => {
    const canvasSettings = useSelector(state => state.canvas)
    const dispatch = useDispatch()
    const [checked, setChecked] = useState(false)

    const toggleChecked = (e) => {
        dispatch(changeRuleset(e.target.checked,property))
        setChecked(e.target.checked)
    }

    return (
        <div className='ruleset-checkbox-wrapper'>
            <label htmlFor={property}>{title}:</label>
            <input name={property} type='checkbox' value={checked} checked={checked} onClick={toggleChecked}/>
        </div>
    );
}

export default RulecheckBox;
