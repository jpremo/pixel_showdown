import React from 'react'
import './Canvas.css'
import {rgbToHex, hexToRgb} from '../canvas/color_functions'

const CanvasTools = props => {

    const { setColor, color } = props
    let hexColor = rgbToHex(color)
    return (
        <div className='canvas-tools'>
            <input type='color' value={hexColor} onChange={(e) => setColor(hexToRgb(e.target.value))}/>
        </div>
    )
}

export default CanvasTools
