import React, { useEffect } from 'react'
import useCanvas from './useCanvas'
import './Canvas.css'
import { drawPixel, overwritePixel } from '../canvas/color_functions'
import { changeProperty } from '../../store/canvas'
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash'
// import {updateGrid} from './grid-utilities'

//This component is what actually handles drawing and displays the image constructed by the user
const Canvas = props => {
    const { draw, ...rest } = props
    const canvasSettings = useSelector(state => state.canvas)
    const dispatch = useDispatch()
    const drawGrid = {} //stores edits to grid during brush strokes; redux state is altered on stroke completion
    const canvasRef = useCanvas(draw, canvasSettings)

    //This function will set the pixel the mouse is over to the color currently selected
    const setPixel = (e) => {
        if (e.buttons === 1) {
            let x = e.pageX - canvasRef.current.offsetParent.offsetLeft - canvasRef.current.offsetLeft - 3;
            let y = e.pageY - canvasRef.current.offsetParent.offsetTop - canvasRef.current.offsetTop - 3;
            let pixelX = Math.floor(x / canvasSettings.pixelSize)
            let pixelY = Math.floor(y / canvasSettings.pixelSize)

            for (let xx = pixelX; xx < canvasSettings.brushSize + pixelX; xx++) {
                for (let yy = pixelY; yy < canvasSettings.brushSize + pixelY; yy++) {
                    const pixelXY = `${xx}-${yy}`
                    if (!drawGrid[pixelXY]) {
                        const canvas = canvasRef.current
                        const ctx = canvas.getContext('2d')
                        const newCol = drawPixel(ctx, canvasSettings.color, xx, yy, canvasSettings.pixelSize)
                        drawGrid[pixelXY] = newCol
                    }
                }
            }
        }
    }

    //Erases pixel at mouse location
    const erasePixel = (e) => {
        if (e.buttons === 1) {
            let x = e.pageX - canvasRef.current.offsetParent.offsetLeft - canvasRef.current.offsetLeft - 3;
            let y = e.pageY - canvasRef.current.offsetParent.offsetTop - canvasRef.current.offsetTop - 3;
            let pixelX = Math.floor(x / canvasSettings.pixelSize)
            let pixelY = Math.floor(y / canvasSettings.pixelSize)

            for (let xx = pixelX; xx < canvasSettings.brushSize + pixelX; xx++) {
                for (let yy = pixelY; yy < canvasSettings.brushSize + pixelY; yy++) {
                    const pixelXY = `${xx}-${yy}`
                    if (!drawGrid[pixelXY]) {
                        const canvas = canvasRef.current
                        const ctx = canvas.getContext('2d')
                        drawPixel(ctx, 'deleted', xx, yy, canvasSettings.pixelSize)
                        drawGrid[pixelXY] = 'deleted'
                    }
                }
            }
        }
    }

    //This function is used with the color swapper tool. It replaces all pixels with the color at the mouse position
    //with the currently selected color
    const swapPixels = (e) => {
        let x = e.pageX - canvasRef.current.offsetParent.offsetLeft - canvasRef.current.offsetLeft - 3;
        let y = e.pageY - canvasRef.current.offsetParent.offsetTop - canvasRef.current.offsetTop - 3;
        let pixelX = Math.floor(x / canvasSettings.pixelSize)
        let pixelY = Math.floor(y / canvasSettings.pixelSize)

        const pixelXY = `${pixelX}-${pixelY}`
        const target = canvasSettings.currentGrid[pixelXY]
        if (target && target !== canvasSettings.color) {
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            for (let key in canvasSettings.currentGrid) {
                if (_.isEqual(canvasSettings.currentGrid[key], target)) {
                    const keySplit = key.split('-')
                    const newCol = overwritePixel(ctx, canvasSettings.color, keySplit[0], keySplit[1], canvasSettings.pixelSize)
                    drawGrid[key] = newCol
                }
            }
        }
    }

    //This function is used with the color swapper brush tool and swaps only filled pixels with the current color.
    //This overides opacity eliminating the need to erase and then fill with a low alpha color
    const swapPixel = (e) => {
        if (e.buttons === 1) {
            let x = e.pageX - canvasRef.current.offsetParent.offsetLeft - canvasRef.current.offsetLeft - 3;
            let y = e.pageY - canvasRef.current.offsetParent.offsetTop - canvasRef.current.offsetTop - 3;
            let pixelX = Math.floor(x / canvasSettings.pixelSize)
            let pixelY = Math.floor(y / canvasSettings.pixelSize)

            const pixelXY = `${pixelX}-${pixelY}`
            const target = canvasSettings.currentGrid[pixelXY]
            for (let xx = pixelX; xx < canvasSettings.brushSize + pixelX; xx++) {
                for (let yy = pixelY; yy < canvasSettings.brushSize + pixelY; yy++) {
                    const pixelXY = `${xx}-${yy}`
                    if ( target && _.isEqual(target, canvasSettings.currentGrid[pixelXY])  && !_.isEqual(target, drawGrid[pixelXY]) &&  target !== canvasSettings.color && target !== 'deleted') {
                        const canvas = canvasRef.current
                        const ctx = canvas.getContext('2d')
                        const newCol = overwritePixel(ctx, canvasSettings.color, xx, yy, canvasSettings.pixelSize)
                        drawGrid[pixelXY] = newCol
                    }
                }
            }
        }
    }

    //This function is used with the color grabber tool and sets current color to the color at the mouse location
    const grabColor = (e) => {
        let x = e.pageX - canvasRef.current.offsetParent.offsetLeft - canvasRef.current.offsetLeft - 3;
        let y = e.pageY - canvasRef.current.offsetParent.offsetTop - canvasRef.current.offsetTop - 3;
        let pixelX = Math.floor(x / canvasSettings.pixelSize)
        let pixelY = Math.floor(y / canvasSettings.pixelSize)

        const pixelXY = `${pixelX}-${pixelY}`
        const target = canvasSettings.currentGrid[pixelXY]
        if (target && target !== 'deleted' && target !== canvasSettings.color) {
            dispatch(changeProperty({ color: target, currentTool: 'brush' }))
        }

    }

    //This function is used with the fill function and recursively replaces the selected color within bounds set by other colors
    const fillPixels = (e) => {
        let x = e.pageX - canvasRef.current.offsetParent.offsetLeft - canvasRef.current.offsetLeft - 3;
        let y = e.pageY - canvasRef.current.offsetParent.offsetTop - canvasRef.current.offsetTop - 3;
        let pixelX = Math.floor(x / canvasSettings.pixelSize)
        let pixelY = Math.floor(y / canvasSettings.pixelSize)

        const pixelXY = `${pixelX}-${pixelY}`
        const color = canvasSettings.color
        const overallTarget = canvasSettings.currentGrid[pixelXY]
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const recursiveFill = (x, y, memo = {}) => {
            const pixelXY = `${x}-${y}`
            if (memo[pixelXY] || x >= canvasSettings.width || x < 0 || y > canvasSettings.height || y < 0) {
                memo[pixelXY] = true
                return
            }
            const target = canvasSettings.currentGrid[pixelXY]
            if (_.isEqual(target, overallTarget)) {
                const newCol = overwritePixel(ctx, color, x, y, canvasSettings.pixelSize)
                drawGrid[pixelXY] = newCol
                memo[pixelXY] = true
                recursiveFill(x + 1, y, memo)
                recursiveFill(x - 1, y, memo)
                recursiveFill(x, y + 1, memo)
                recursiveFill(x, y - 1, memo)
            }
        }

        recursiveFill(pixelX, pixelY)
    }

    //Does the correct action for the specified tool when the mouse is held down
    const toolAction = (e) => {
        if (!canvasSettings.playing) {
            switch (canvasSettings.currentTool) {
                case 'brush': setPixel(e); break;
                case 'eraser': erasePixel(e); break;
                case 'colorSwapBrush': swapPixel(e); break;
                default: break;
            }
        }
    }

    //Does the correct action for the specified tool when the mouse is released
    const toolUp = (e) => {
        if (!canvasSettings.playing) {
            switch (canvasSettings.currentTool) {
                case 'colorSwap': swapPixels(e); break;
                case 'fill': fillPixels(e); break;
                case 'colorGrab': grabColor(e); break;
                default: break;
            }
            updateGrid()
        }
    }

    //This function updates the grid in the redux store upon stroke completion
    function updateGrid() {
        if (Object.keys(drawGrid).length) {
            const newGrid = { ...canvasSettings.currentGrid, ...drawGrid }
            for (let key in newGrid) {
                if (newGrid[key] === 'deleted' || newGrid[key][3] === 0) {
                    delete newGrid[key]
                }
            }
            const newPosition = canvasSettings.historyPosition[canvasSettings.currentFrame - 1] + 1
            const newPositionFinal = [...canvasSettings.historyPosition]
            newPositionFinal[canvasSettings.currentFrame - 1] = newPosition
            const newMoveHistory = [...canvasSettings.moveHistory[canvasSettings.currentFrame - 1].slice(0, newPosition), drawGrid]
            const newMoveHistoryFinal = [...canvasSettings.moveHistory]
            newMoveHistoryFinal[canvasSettings.currentFrame - 1] = newMoveHistory
            const wholeGridCopy = [...canvasSettings.grid]
            wholeGridCopy[canvasSettings.currentFrame - 1] = newGrid
            dispatch(changeProperty({ currentGrid: newGrid, grid: wholeGridCopy, moveHistory: newMoveHistoryFinal, historyPosition: newPositionFinal }))
        }
    }

    let currentCursor = 'https://pixel-showdown.s3.amazonaws.com/app-content/d807d859-3a20-4e7a-afe3-22446d310b6e.png'

    return (
        <>
            {/* style={{cursor: `url('${currentCursor}'), auto`}} */}
            <canvas className='pixel-canvas' ref={canvasRef} {...rest} onMouseMove={toolAction} onMouseDown={toolAction} onMouseUp={toolUp} onMouseLeave={updateGrid} />
        </>
    )
}

export default Canvas
