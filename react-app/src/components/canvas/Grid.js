import React from 'react'
import useCanvas from './useCanvas'
import './Canvas.css'
import { useSelector } from "react-redux";
import { drawGrid } from '../canvas/color_functions'

//This component creates the grid overlay used in the CompleteCanvas component
const Grid = () => {
    const options = useSelector(state => state.canvas)

    const gridDraw = ctx => {
        drawGrid(ctx, options.pixelSize, options.width, options.height)
    }

    const canvasRef = useCanvas(gridDraw, options)

    return (
        <>
            <canvas className='canvas-grid' ref={canvasRef}/>
        </>
    )
}

export default Grid
