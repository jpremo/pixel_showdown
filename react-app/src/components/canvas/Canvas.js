import React from 'react'
import useCanvas from './useCanvas'
import './Canvas.css'
import {drawPixel} from '../canvas/color_functions'

const Canvas = props => {
    const { draw, options, ...rest } = props
    const gridCopy = { ...options.finalGrid };
    const canvasRef = useCanvas(draw, options)

    let interval;

    const setPixel = (e) => {
        if(e.buttons == 1) {
        let x = e.pageX - canvasRef.current.offsetLeft + 1;
        let y = e.pageY - canvasRef.current.offsetTop + 1;
        let pixelX = Math.floor(x / options.pixelSize)
        let pixelY = Math.floor(y / options.pixelSize)
        gridCopy[`${pixelX}-${pixelY}`] = options.color
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        drawPixel(ctx, options.color, pixelX, pixelY, options.pixelSize)
    }
    }

    function updateGrid() {
        options.setGrid({ ...options.grid, ...gridCopy})
    }

    return (
        <div className='canvas-div'>
            <canvas className='pixel-canvas' ref={canvasRef} {...rest} onMouseMove={setPixel} onMouseDown={setPixel} onMouseUp={updateGrid}/>
        </div>
    )
}

export default Canvas
