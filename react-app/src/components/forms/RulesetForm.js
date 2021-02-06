import React, { useEffect, useState } from 'react';
import { changeProperty } from '../../store/canvas'
import { useDispatch, useSelector } from 'react-redux';
import RulecheckBox from './RuleCheckbox';
import CompleteCanvas from '../canvas/CompleteCanvas';
import RulesetRange from './RulesetRange';
import RulesetRange2 from './RulesetRange2';
//This component creates a -/input/+ box for the canvas property specified in props
const RulesetForm = () => {
    const canvasSettings = useSelector(state => state.canvas)
    const dispatch = useDispatch()

    return (
        <>
            <h1>Ruleset Form</h1>
            <RulecheckBox property='disableGrid' title='Disable Grid' />
            {/* <RulesetRange property='totalFrames' min={1} max={100} defaultValue={1} title='Frame Count Range'/> */}
            <RulesetRange2/>
            <CompleteCanvas/>
        </>
    );
}

export default RulesetForm;
