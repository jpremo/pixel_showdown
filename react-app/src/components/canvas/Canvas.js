import React, { useEffect } from 'react'
import useCanvas from './useCanvas'
import './Canvas.css'
import { drawPixel, mergeColors, overwritePixel, pixelParser } from '../canvas/color_functions'
import { changeProperty } from '../../store/canvas'
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash'
const Canvas = props => {
    const { draw, ...rest } = props
    const canvasSettings = useSelector(state => state.canvas)
    const dispatch = useDispatch()
    const gridCopy = { ...canvasSettings.finalGrid };
    const drawGrid = {}
    const canvasRef = useCanvas(draw, canvasSettings)

    function imageToDataUri(img, width, height) {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        // debugger
        pixelParser(ctx, 1, canvasSettings.grid)

        // ctx.drawImage(img, 0, 0, width, height);

        return canvas.toDataURL();
    }

    function download(){
        let base = canvasRef.current.toDataURL("image/png");
        let url = imageToDataUri(canvasRef.current, canvasSettings.width, canvasSettings.height)
        let link = document.createElement('a');
        link.download = 'filename.png';
        link.href = url;
        link.click();
        dispatch(changeProperty({downloading:false}))
      }

    useEffect(() => {
        if(canvasSettings.downloading) {
            download()
        }
    }, [canvasSettings.downloading])

    const setPixel = (e) => {
        if (e.buttons == 1) {
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

    const erasePixel = (e) => {
        if (e.buttons == 1) {
            // debugger
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

    const swapPixels = (e) => {
        let x = e.pageX - canvasRef.current.offsetParent.offsetLeft - canvasRef.current.offsetLeft - 3;
        let y = e.pageY - canvasRef.current.offsetParent.offsetTop - canvasRef.current.offsetTop - 3;
        let pixelX = Math.floor(x / canvasSettings.pixelSize)
        let pixelY = Math.floor(y / canvasSettings.pixelSize)

        const pixelXY = `${pixelX}-${pixelY}`
        const target = canvasSettings.grid[pixelXY]
        if (target && target != canvasSettings.color) {
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            for (let key in canvasSettings.grid) {
                if (_.isEqual(canvasSettings.grid[key], target)) {
                    const keySplit = key.split('-')
                    const newCol = overwritePixel(ctx, canvasSettings.color, keySplit[0], keySplit[1], canvasSettings.pixelSize)
                    drawGrid[key] = newCol
                }
            }
        }
    }

    const grabColor = (e) => {
        let x = e.pageX - canvasRef.current.offsetParent.offsetLeft - canvasRef.current.offsetLeft - 3;
        let y = e.pageY - canvasRef.current.offsetParent.offsetTop - canvasRef.current.offsetTop - 3;
        let pixelX = Math.floor(x / canvasSettings.pixelSize)
        let pixelY = Math.floor(y / canvasSettings.pixelSize)

        const pixelXY = `${pixelX}-${pixelY}`
        const target = canvasSettings.grid[pixelXY]
        if (target && target!='deleted' && target != canvasSettings.color) {
            dispatch(changeProperty({color: target, currentTool: 'brush'}))
        }

    }

    const fillPixels = (e) => {
        let x = e.pageX - canvasRef.current.offsetParent.offsetLeft - canvasRef.current.offsetLeft - 3;
        let y = e.pageY - canvasRef.current.offsetParent.offsetTop - canvasRef.current.offsetTop - 3;
        let pixelX = Math.floor(x / canvasSettings.pixelSize)
        let pixelY = Math.floor(y / canvasSettings.pixelSize)

        const pixelXY = `${pixelX}-${pixelY}`
        const color = canvasSettings.color
        const overallTarget = canvasSettings.grid[pixelXY]
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const recursiveFill = (x, y, memo = {}) => {
            const pixelXY = `${x}-${y}`
            if (memo[pixelXY] || x >= canvasSettings.width || x < 0 || y > canvasSettings.height || y < 0) {
                memo[pixelXY] = true
                return
            }
            const target = canvasSettings.grid[pixelXY]
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

    const swapPixel = (e) => {
        if (e.buttons == 1) {
            let x = e.pageX - canvasRef.current.offsetParent.offsetLeft - canvasRef.current.offsetLeft - 3;
            let y = e.pageY - canvasRef.current.offsetParent.offsetTop - canvasRef.current.offsetTop - 3;
            let pixelX = Math.floor(x / canvasSettings.pixelSize)
            let pixelY = Math.floor(y / canvasSettings.pixelSize)

            const pixelXY = `${pixelX}-${pixelY}`
            const target = canvasSettings.grid[pixelXY]
            if (target && target != canvasSettings.color) {
                const canvas = canvasRef.current
                const ctx = canvas.getContext('2d')
                const newCol = overwritePixel(ctx, canvasSettings.color, pixelX, pixelY, canvasSettings.pixelSize)
                drawGrid[pixelXY] = newCol
            }
        }
    }

    const toolAction = (e) => {
        switch (canvasSettings.currentTool) {
            case 'brush': setPixel(e); break;
            case 'eraser': erasePixel(e); break;
            case 'colorSwapBrush': swapPixel(e); break;
            default: break;
        }
    }

    function updateGrid() {
        if (Object.keys(drawGrid).length) {
            const newGrid = { ...canvasSettings.grid, ...drawGrid }
            for (let key in newGrid) {
                if (newGrid[key] === 'deleted' || newGrid[key][3] === 0) {
                    delete newGrid[key]
                }
            }
            const newPosition = canvasSettings.historyPosition + 1
            const newMoveHistory = [...canvasSettings.moveHistory.slice(0, newPosition), drawGrid]
            dispatch(changeProperty({ grid: newGrid, moveHistory: newMoveHistory, historyPosition: newPosition }))
        }
    }

    const toolUp = (e) => {
        switch (canvasSettings.currentTool) {
            case 'colorSwap': swapPixels(e); break;
            case 'fill': fillPixels(e); break;
            case 'colorGrab': grabColor(e); break;
            default: break;
        }

        updateGrid()
    }


    return (
        <>
            <canvas className='pixel-canvas' ref={canvasRef} {...rest} onMouseMove={toolAction} onMouseDown={toolAction} onMouseUp={toolUp} onMouseLeave={updateGrid} />
        </>
    )
}

export default Canvas
