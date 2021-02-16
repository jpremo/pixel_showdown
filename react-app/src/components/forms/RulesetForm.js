import React, { useEffect, useState } from 'react';
import { changeProperty } from '../../store/canvas'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import RulecheckBox from './RuleCheckbox';
import CompleteCanvas from '../canvas/CompleteCanvas';
import RulesetRange from './RulesetRange';
import './RulesetForm.css'
import RulesetSelector from './RulesetSelector';
import RulesetColor from './RulesetColor'
import Collapse from '../canvas/Collapse'
import { setLoginModal } from '../../store/modal'
//This component creates a -/input/+ box for the canvas property specified in props
const RulesetForm = () => {
    const canvasSettings = useSelector(state => state.canvas)
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
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

    const submitRuleset = async () => {
        if(user.id) {


        const response = await fetch("/api/rulesets/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              rules:{...canvasSettings.ruleset},
              title,
              description: body,
              userId: user.id
            }),
          });
          history.push('/')
          return await response.json();
        } else {
            dispatch(setLoginModal(true))
        }
    }

    const changeTitle = (e) => {
        setTitle(e.target.value)
    }

    const changeBody = (e) => {
        setBody(e.target.value)
    }

    return (
        <div id='ruleset-form-outer-wrapper'>
        <div id='ruleset-form-wrapper'>
            <h1 className='form-title'>Create a Ruleset</h1>
            <div className='ruleset-content-div'>
                <label htmlFor='title'>Title</label>
                <input name='title' maxLength='50' placeholder='Title' value={title} onChange={changeTitle} />
            </div>
            <div className='ruleset-content-div'>
                <label htmlFor='description'>Description</label>
                <textarea name='description' maxLength='1000' placeholder='Description' onChange={changeBody} value={body}/>
                <div name='description' maxLength='1000' placeholder='Description' onChange={changeBody} value={body}>{body.length}/1000</div>
            </div>
            <div className='ruleset-content-container'>
                <RulesetSelector title='Time Limit' options={timeLimitOptions} property={'timeLimit'} />
                <RulesetSelector title='Competition Length' options={contestLengthOptions} property={'contestLength'} />
            </div>
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
                <RulecheckBox property='disableCopyPaste' title='Disable Copy/Paste' />
            </div>
            <div className='ruleset-content-container'>
            <RulesetRange property='totalFrames' title='Total Frames' />
            <RulesetRange property='fps' title='FPS' />
            <RulesetRange property='pixelSize' title='Pixel Size' initialDefault={20} />
            <RulesetRange property='brushSize' title='Brush Size' />
            <RulesetRange property='width' title='Canvas Width' initialDefault={32}/>
            <RulesetRange property='height' title='Canvas Height' initialDefault={32}/>
            </div>

            <RulesetColor/>
            {/* <h1 className='form-title' style={{margin: '20px'}}>Canvas Preview</h1> */}
            <button className='canvas-button' onClick={submitRuleset}>Submit Ruleset</button>
            {/* <Collapse title='Canvas Preview' collapsedInit={true}> */}
            <h1 className='form-title form-title-upper-margin'>Canvas Preview</h1>
            <CompleteCanvas reload={true} disableHotKeys={true} disableSave={true} skipDefault={true}/>
            {/* </Collapse> */}
        </div>
        </div>
    );
}

export default RulesetForm;
