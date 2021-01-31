import React, { useEffect } from 'react'
import useCanvas from './useCanvas'
import './Canvas.css'
import {drawPixel, mergeColors} from '../canvas/color_functions'
import { changeProperty } from '../../store/canvas'
import { useDispatch, useSelector } from "react-redux";

const Canvas = props => {
    const { draw, ...rest } = props
    const options = useSelector(state => state.canvas)
    const dispatch = useDispatch()
    const gridCopy = { ...options.finalGrid };
    const drawGrid = {}
    const canvasRef = useCanvas(draw, options)



    const setPixel = (e) => {
        if(e.buttons == 1) {
        let x = e.pageX - canvasRef.current.offsetLeft + 1;
        let y = e.pageY - canvasRef.current.offsetTop + 1;
        let pixelX = Math.floor(x / options.pixelSize)
        let pixelY = Math.floor(y / options.pixelSize)

        const pixelXY = `${pixelX}-${pixelY}`
        if(!drawGrid[pixelXY]) {
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            const newCol = drawPixel(ctx, options.color, pixelX, pixelY, options.pixelSize)
            drawGrid[pixelXY] = newCol
        }
    }
    }

    function updateGrid() {
        console.log('triggered')
        const newGrid = { ...options.grid, ...drawGrid}
        dispatch(changeProperty({grid: newGrid}))
    }



    return (
        <>
        {/* <div className='whole-page-div' onMouseUp={updateGrid}></div> */}
        <div className='canvas-div'>
            <canvas className='pixel-canvas' ref={canvasRef} {...rest} onMouseMove={setPixel} onMouseDown={setPixel} onMouseUp={updateGrid} onMouseLeave={updateGrid}/>
        </div>
        </>
    )
}

export default Canvas
