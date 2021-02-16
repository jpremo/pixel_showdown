import React, { useEffect } from "react";
import Canvas from '../canvas/Canvas'
import CanvasTools from '../canvas/CanvasTools'
import { pixelParser } from '../canvas/color_functions'
import { useDispatch, useSelector } from "react-redux";
import {changeProperty} from '../../store/canvas'
import Backdrop from './Backdrop'
import Grid from './Grid'
import TitleCard from './TitleCard'

//This component contains the entire canvas along with its backdrop and all tools
function CompleteCanvas({reload=false, disableHotKeys=false, skipDefault=false, disableSave=false}) {
    const canvasSettings = useSelector(state => state.canvas)
    const dispatch = useDispatch()

    const loadRuleset = () => {
        // debugger
        const ruleset = canvasSettings.ruleset
        const newProperties = {}
        for(let key in ruleset) {
            if(ruleset[key]['defaultValue']){
                newProperties[key] = ruleset[key]['defaultValue']
            }
        }
        dispatch(changeProperty(newProperties))
    }

    useEffect(() => {
        loadRuleset()
    }, [canvasSettings.ruleset])
    //Function passes in props to Cavas component to specify what it should do on initialization
    const draw = ctx => {
        pixelParser(ctx, canvasSettings.pixelSize, canvasSettings.currentGrid)
    }

    return (
        <div id='complete-canvas-wrapper'>
            <div id='canvas-and-title-div'>
                <TitleCard />
                <div className='canvas-div'>
                    <div className='canvas-div-background' />
                    <Backdrop />
                    <Canvas draw={draw} disableHotKeys={disableHotKeys} />
                    {canvasSettings.displayGrid && <Grid />}
                </div>
            </div>
            <div >
                <CanvasTools canvasSettings={canvasSettings} disableHotKeys={disableHotKeys} skipDefault={skipDefault} disableSave={disableSave}/>
            </div>
        </div>
    );
}
export default CompleteCanvas;
