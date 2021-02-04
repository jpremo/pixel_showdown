import React from "react";
import Canvas from '../canvas/Canvas'
import CanvasTools from '../canvas/CanvasTools'
import { pixelParser } from '../canvas/color_functions'
import { useSelector } from "react-redux";
import Backdrop from './Backdrop'
import Grid from './Grid'
import TitleCard from './TitleCard'

//This component contains the entire canvas along with its backdrop and all tools
function CompleteCanvas() {
    const canvasSettings = useSelector(state => state.canvas)

    //Function passes in props to Cavas component to specify what it should do on initialization
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
