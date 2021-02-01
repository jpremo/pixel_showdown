import React from 'react'
import './Canvas.css'
import { rgbToHex, hexToRgb } from '../canvas/color_functions'
import { changeProperty } from '../../store/canvas'
import { useDispatch, useSelector } from "react-redux";
import { SketchPicker } from 'react-color'

const CanvasTools = props => {
    const dispatch = useDispatch()
    const canvasSettings = useSelector(state => state.canvas)

    const colorChange = (e) => {
        const colArr = [e.rgb.r, e.rgb.g, e.rgb.b, e.rgb.a,]
        dispatch(changeProperty({ color: colArr }))
    }

    let a = canvasSettings.color[3] ? canvasSettings.color[3] : 1
    let colObj = {
        r: canvasSettings.color[0],
        g: canvasSettings.color[1],
        b: canvasSettings.color[2],
        a
    }

    const undo = () => {
        const newPosition = Math.max(canvasSettings.historyPosition - 1, 0)
        const newGrid = {}
        for(let i = 0; i <= newPosition; i++){
            Object.assign(newGrid, canvasSettings.moveHistory[i] );
        }
        dispatch(changeProperty({ historyPosition: newPosition, grid: newGrid }))
    }

    const redo = () => {
        const newPosition = Math.min(canvasSettings.historyPosition + 1, canvasSettings.moveHistory.length-1)
        const newGrid = {}
        for(let i = 0; i <= newPosition; i++){
            Object.assign(newGrid, canvasSettings.moveHistory[i] );
        }
        dispatch(changeProperty({ historyPosition: newPosition, grid: newGrid }))
    }

    const undoClass = canvasSettings.historyPosition > 0 ? '' : ' invalid-selection'
    const redoClass = canvasSettings.historyPosition === canvasSettings.moveHistory.length-1 ? ' invalid-selection' : ''

    return (
        <div className='canvas-tools'>
            {/* <input type='color' value={hexColor} onChangeComplete={colorChange}/> */}
            <SketchPicker
                color={colObj}
                onChangeComplete={colorChange}
            />
            <button className={'history-button'+undoClass} onClick={undo}>Undo</button>
            <button className={'history-button'+redoClass} onClick={redo}>Redo</button>
        </div>
    )
}

export default CanvasTools
