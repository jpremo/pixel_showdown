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
    return (
        <div className='canvas-tools'>
            {/* <input type='color' value={hexColor} onChangeComplete={colorChange}/> */}
            <SketchPicker
                color={colObj}
                onChangeComplete={colorChange}
            />
        </div>
    )
}

export default CanvasTools
