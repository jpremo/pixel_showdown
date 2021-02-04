import React, { useEffect } from 'react'
import useCanvas from './useCanvas'
import './Canvas.css'
import { useSelector } from "react-redux";
import { backDrop } from '../canvas/color_functions'

//The component creates the backdrop/background for the CompleteCanvas component
const Backdrop = () => {
    const options = useSelector(state => state.canvas)

    const backDraw = ctx => {
        backDrop(ctx, options.pixelSize, options.width, options.height)
    }

    const canvasRef = useCanvas(backDraw, options)

    return (
        <>
            <canvas className='canvas-backdrop' ref={canvasRef}/>
        </>
    )
}

export default Backdrop
