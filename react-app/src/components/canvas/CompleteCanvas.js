import React, { useState, useEffect } from "react";
import Canvas from '../canvas/Canvas'
import CanvasTools from '../canvas/CanvasTools'
import { pixelParser, backDrop } from '../canvas/color_functions'
import { changeProperty } from '../../store/canvas'
import { useDispatch, useSelector } from "react-redux";
import Backdrop from './Backdrop'
import Grid from './Grid'
import TitleCard from './TitleCard'

function CompleteCanvas() {
    const dispatch = useDispatch()
    const canvasSettings = useSelector(state => state.canvas)
    useEffect(() => {
        const initialSettings = {
            pixelSize: 20,
            height: 32,
            width: 32,
            color: [180, 180, 180, 1],
            grid: {},
            finalGrid: {}
        }

        dispatch(changeProperty(initialSettings))

    }, [dispatch])



    const draw = ctx => {
        pixelParser(ctx, canvasSettings.pixelSize, canvasSettings.grid)
    }

    return (
        <div id='complete-canvas-wrapper'>
            <div id='canvas-and-title-div'>
                <TitleCard />
                <div className='canvas-div'>
                    <div className='canvas-div-background' />
                    <Backdrop />
                    <Canvas draw={draw} />
                    {canvasSettings.displayGrid && <Grid />}
                </div>
            </div>
            <div >
                <CanvasTools canvasSettings={canvasSettings} />
            </div>
        </div>
    );
}
export default CompleteCanvas;
