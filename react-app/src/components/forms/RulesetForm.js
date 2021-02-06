import React, { useEffect, useState } from 'react';
import { changeProperty } from '../../store/canvas'
import { useDispatch, useSelector } from 'react-redux';
import RulecheckBox from './RuleCheckbox';
import CompleteCanvas from '../canvas/CompleteCanvas';
import RulesetRange from './RulesetRange';
import './RulesetForm.css'
//This component creates a -/input/+ box for the canvas property specified in props
const RulesetForm = () => {
    const canvasSettings = useSelector(state => state.canvas)
    const dispatch = useDispatch()

    return (
        <>
            <h1>Ruleset Form</h1>
            <RulecheckBox property='disableGrid' title='Disable Grid' />
            {/* <RulesetRange property='totalFrames' min={1} max={100} defaultValue={1} title='Frame Count Range'/> */}
            <RulesetRange property='totalFrames' title='Total Frames'/>
            <CompleteCanvas reload={true}/>
        </>
    );
}

export default RulesetForm;
