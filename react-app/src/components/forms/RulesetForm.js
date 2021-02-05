import React, { useEffect, useState } from 'react';
import { changeProperty } from '../../store/canvas'
import { useDispatch, useSelector } from 'react-redux';

//This component creates a -/input/+ box for the canvas property specified in props
const RulesetForm = () => {
    const canvasSettings = useSelector(state => state.canvas)
    const dispatch = useDispatch()

    return (
        <div>
            Ruleset Form
        </div>
    );
}

export default RulesetForm;
