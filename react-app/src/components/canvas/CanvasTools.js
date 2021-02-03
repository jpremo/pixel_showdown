import React, { useEffect, useState } from 'react'
import './Canvas.css'
import { rgbaToHex, hexToRgba } from '../canvas/color_functions'
import { changeProperty } from '../../store/canvas'
import { useDispatch, useSelector } from "react-redux";
import { SketchPicker, AlphaPicker, CirclePicker, PhotoshopPicker } from 'react-color'
import useKeyPress from './useKeyPress'
import AddSubtract from './AddSubtract'
import Collapse from './Collapse'

const CanvasTools = props => {
    const dispatch = useDispatch()
    const canvasSettings = props.canvasSettings
    const z = useKeyPress('z')
    const y = useKeyPress('y')
    const ctrl = useKeyPress('Control')
    const [alpha, setAlpha] = useState(canvasSettings.color[3])
    const [stateColor, setStateColor] = useState({
        r: canvasSettings.color[0],
        g: canvasSettings.color[1],
        b: canvasSettings.color[2],
        a: canvasSettings.color[3]
    })

    useEffect(() => {
        setStateColor({
            r: canvasSettings.color[0],
            g: canvasSettings.color[1],
            b: canvasSettings.color[2],
            a: canvasSettings.color[3]
        })
    }, [canvasSettings])

    useEffect(() => {
        if (z && ctrl) {
            undo()
        }
    }, [z])

    useEffect(() => {
        if (y && ctrl) {
            redo()
        }
    }, [y])

    const colorChange = (e) => {
        const colArr = [e.rgb.r, e.rgb.g, e.rgb.b, e.rgb.a,]
        dispatch(changeProperty({ color: colArr }))
        setStateColor(e.rgb)
        setAlpha(e.rgb.a)
    }

    const colorState = (e) => {
        setStateColor(e.rgb)
    }

    const alphaChange = (e) => {
        const colArr = [...canvasSettings.color]
        colArr[3] = e.rgb.a
        dispatch(changeProperty({ color: colArr }))
    }

    const alphaState = (e) => {
        setAlpha(e.rgb.a)
    }

    let a = canvasSettings.color[3] ? canvasSettings.color[3] : 1
    let colObj = {
        r: canvasSettings.color[0],
        g: canvasSettings.color[1],
        b: canvasSettings.color[2],
        a
    }

    const undo = () => {
        // debugger
        const newPosition = Math.max(canvasSettings.historyPosition - 1, 0)
        const newGrid = {}
        for (let i = 0; i <= newPosition; i++) {
            Object.assign(newGrid, canvasSettings.moveHistory[i]);
        }
        dispatch(changeProperty({ historyPosition: newPosition, grid: newGrid }))
    }

    const redo = () => {
        const newPosition = Math.min(canvasSettings.historyPosition + 1, canvasSettings.moveHistory.length - 1)
        const newGrid = {}
        for (let i = 0; i <= newPosition; i++) {
            Object.assign(newGrid, canvasSettings.moveHistory[i]);
        }
        dispatch(changeProperty({ historyPosition: newPosition, grid: newGrid }))
    }

    const swapGrid = () => {
        dispatch(changeProperty({ displayGrid: !canvasSettings.displayGrid }))
    }

    const swapEraser = () => {
        dispatch(changeProperty({ currentTool: 'eraser' }))
    }

    const swapBrush = () => {
        dispatch(changeProperty({ currentTool: 'brush' }))
    }

    const swapFill = () => {
        dispatch(changeProperty({ currentTool: 'fill' }))
    }

    const swapColorSwap = () => {
        dispatch(changeProperty({ currentTool: 'colorSwap' }))
    }

    const swapColorSwapBrush = () => {
        dispatch(changeProperty({ currentTool: 'colorSwapBrush' }))
    }

    const clearImage = () => {
        const newGrid = {}
        for (let key in canvasSettings.grid) {
            newGrid[key] = 'deleted'
        }
        const newPosition = canvasSettings.historyPosition + 1
        const newMoveHistory = [...canvasSettings.moveHistory.slice(0, newPosition), newGrid]
        dispatch(changeProperty({ grid: {}, moveHistory: newMoveHistory, historyPosition: newPosition }))
    }

    const undoClass = canvasSettings.historyPosition > 0 ? '' : ' invalid-selection'
    const redoClass = canvasSettings.historyPosition === canvasSettings.moveHistory.length - 1 ? ' invalid-selection' : ''
    const gridClass = canvasSettings.displayGrid ? ' selected' : ''
    const brushClass = canvasSettings.currentTool === 'brush' ? ' selected' : ''
    const eraserClass = canvasSettings.currentTool === 'eraser' ? ' selected' : ''
    const fillClass = canvasSettings.currentTool === 'fill' ? ' selected' : ''
    const colorSwapClass = canvasSettings.currentTool === 'colorSwap' ? ' selected' : ''
    const colorSwapBrushClass = canvasSettings.currentTool === 'colorSwapBrush' ? ' selected' : ''
    const removeFromPalette = !canvasSettings.colorPalette.length ? ' invalid-selection' : ''
    // console.log(rgbaToHex(canvasSettings.color))
    const addToPalette = canvasSettings.colorPalette.includes(rgbaToHex(canvasSettings.color)) ? ' invalid-selection' : ''
    // debugger
    return (
        <div className='canvas-tools'>
            <h2>Canvas Tools</h2>
            <Collapse title={'Color Selector'}>

                <SketchPicker
                    color={stateColor}
                    onChange={colorState}
                    onChangeComplete={colorChange}
                    presetColors={[]}
                    width='238px'
                    className='canvas-tools-custom'
                />
            </Collapse>
            <Collapse title={'Color Palette'}>
                <div className='canvas-tools-circle'>
                    <CirclePicker
                        color={colObj}
                        onChangeComplete={colorChange}
                        colors={canvasSettings.colorPalette}
                    />
                </div>
                <div className='canvas-tools-container'>
                    <button className={'canvas-button' + addToPalette} onClick={undo}>Add Current Color to Palette</button>
                    <button className={'canvas-button' + removeFromPalette} onClick={redo}>Remove from Palette</button>
                </div>
                <AlphaPicker
                    color={stateColor}
                    onChange={colorState}
                    onChangeComplete={colorChange}
                    width='258px'
                    className='canvas-tools-alpha'
                />
            </Collapse>
            <Collapse title={'Brushes and Tools'}>
                <div className='canvas-tools-container'>
                    <button className={'canvas-button' + undoClass} onClick={undo}>Undo</button>
                    <button className={'canvas-button' + redoClass} onClick={redo}>Redo</button>
                    <button className={'canvas-button' + gridClass} onClick={swapGrid}>Grid</button>
                    <button className={'canvas-button' + brushClass} onClick={swapBrush}>Brush</button>
                    <button className={'canvas-button' + eraserClass} onClick={swapEraser}>Eraser</button>
                    <button className={'canvas-button' + fillClass} onClick={swapFill}>Fill</button>
                    <button className={'canvas-button' + colorSwapClass} onClick={swapColorSwap}>Color Swap</button>
                    <button className={'canvas-button' + colorSwapBrushClass} onClick={swapColorSwapBrush}>Color Swap Brush</button>
                    <button className={'canvas-button'} onClick={clearImage}>Clear Image</button>
                </div>
            </Collapse>
            <Collapse title={'Configurables'}>
                <div className='canvas-tools-container'>
                    <AddSubtract property={'pixelSize'} title={'Pixel Size'} min={1} max={100} />
                    <AddSubtract property={'brushSize'} title={'Brush Size'} min={1} max={100} />
                </div>
            </Collapse>
        </div >
    )
}

export default CanvasTools
