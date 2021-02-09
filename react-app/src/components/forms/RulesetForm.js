import React, { useEffect, useState } from 'react';
import { changeProperty } from '../../store/canvas'
import { useDispatch, useSelector } from 'react-redux';
import RulecheckBox from './RuleCheckbox';
import CompleteCanvas from '../canvas/CompleteCanvas';
import RulesetRange from './RulesetRange';
import './RulesetForm.css'
import RulesetSelector from './RulesetSelector';
import RulesetColor from './RulesetColor'
//This component creates a -/input/+ box for the canvas property specified in props
const RulesetForm = () => {
    const canvasSettings = useSelector(state => state.canvas)
    const dispatch = useDispatch()
    const timeLimitOptions = [
        { value: .5, label: '30 Seconds' },
        { value: 1, label: '1 Minute' },
        { value: 2, label: '2 Minutes' },
        { value: 3, label: '3 Minutes' },
        { value: 4, label: '4 Minutes' },
        { value: 5, label: '5 Minutes' },
        { value: 10, label: '10 Minutes' },
        { value: 15, label: '15 Minutes' },
        { value: 20, label: '20 Minutes' },
        { value: 25, label: '25 Minutes' },
        { value: 30, label: '30 Minutes' },
        { value: 40, label: '40 Minutes' },
        { value: 50, label: '50 Minutes' },
        { value: 60, label: '1 Hour' },
    ]
    const contestLengthOptions = [
        { value: 1, label: '1 Hour' },
        { value: 2, label: '2 Hours' },
        { value: 4, label: '4 Hours' },
        { value: 6, label: '6 Hours' },
        { value: 8, label: '8 Hours' },
        { value: 10, label: '10 Hours' },
        { value: 12, label: '12 Hours' },
        { value: 16, label: '16 Hours' },
        { value: 20, label: '20 Hours' },
        { value: 24, label: '24 Hours' },
        { value: 30, label: '30 Hours' },
        { value: 36, label: '36 Hours' },
        { value: 42, label: '42 Hours' },
        { value: 48, label: '48 Hours' },
    ]
    return (
        <div id='ruleset-form-outer-wrapper'>
        <div id='ruleset-form-wrapper'>
            <h1 className='form-title'>Create a Ruleset</h1>
            <div className='ruleset-content-container'>
                <RulecheckBox property='disableColorSelector' title='Disable Custom Colors' />
                <RulecheckBox property='disableAlphaPicker' title='Disable Alpha Slider' />
                <RulecheckBox property='disableEraser' title='Disable Eraser' />
                <RulecheckBox property='disableFill' title='Disable Fill Tool' />
                <RulecheckBox property='disableEyedropper' title='Disable Eyedropper' />
                <RulecheckBox property='disableColorSwapper' title='Disable Color Swapper' />
                <RulecheckBox property='disableColorSwapBrush' title='Disable Color Swap Brush' />
                <RulecheckBox property='disableUndoRedo' title='Disable Undo and Redo' />
                <RulecheckBox property='disableGrid' title='Disable Grid' />
                <RulecheckBox property='disableClear' title='Disable Clear' />
            </div>
            <div className='ruleset-content-container'>
            <RulesetRange property='totalFrames' title='Total Frames' />
            <RulesetRange property='fps' title='FPS' />
            <RulesetRange property='pixelSize' title='Pixel Size' />
            <RulesetRange property='brushSize' title='Brush Size' />
            <RulesetRange property='width' title='Canvas Width' />
            <RulesetRange property='height' title='Canvas Height' />
            </div>
            <div className='ruleset-content-container'>
                <RulesetSelector title='Time Limit' options={timeLimitOptions} property={'timeLimit'} />
                <RulesetSelector title='Competition Length' options={contestLengthOptions} property={'contestLength'} />
            </div>
            <RulesetColor/>
            <h1 className='form-title' style={{margin: '20px'}}>Canvas Preview</h1>
            <CompleteCanvas reload={true} />
        </div>
        </div>
    );
}

export default RulesetForm;
