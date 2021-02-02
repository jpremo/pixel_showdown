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
            // debugger
        let x = e.pageX - canvasRef.current.offsetParent.offsetLeft - canvasRef.current.offsetLeft - 3;
        let y = e.pageY - canvasRef.current.offsetParent.offsetTop - canvasRef.current.offsetTop - 3;
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

    const erasePixel = (e) => {
        if(e.buttons == 1) {
            // debugger
        let x = e.pageX - canvasRef.current.offsetParent.offsetLeft - canvasRef.current.offsetLeft - 3;
        let y = e.pageY - canvasRef.current.offsetParent.offsetTop - canvasRef.current.offsetTop - 3;
        let pixelX = Math.floor(x / options.pixelSize)
        let pixelY = Math.floor(y / options.pixelSize)

        const pixelXY = `${pixelX}-${pixelY}`
        if(!drawGrid[pixelXY]) {
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            drawPixel(ctx, 'deleted', pixelX, pixelY, options.pixelSize)
            drawGrid[pixelXY] = 'deleted'
        }
    }
    }

    const toolAction = (e) => {
        switch(options.currentTool) {
            case 'brush': setPixel(e); break;
            case 'eraser': erasePixel(e); break;
            default: break;
        }
    }

    function updateGrid() {
        if(Object.keys(drawGrid).length) {
            const newGrid = { ...options.grid, ...drawGrid}
            for(let key in newGrid) {
                if(newGrid[key] === 'deleted') {
                    delete newGrid[key]
                }
            }
            const newPosition = options.historyPosition+1
            const newMoveHistory = [...options.moveHistory.slice(0, newPosition),drawGrid]
            dispatch(changeProperty({grid: newGrid, moveHistory: newMoveHistory, historyPosition: newPosition}))
        }
    }



    return (
        <>
            <canvas className='pixel-canvas' ref={canvasRef} {...rest} onMouseMove={toolAction} onMouseDown={toolAction} onMouseUp={updateGrid} onMouseLeave={updateGrid}/>
        </>
    )
}

export default Canvas
