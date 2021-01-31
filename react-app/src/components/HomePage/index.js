import React, { useState, useEffect } from "react";
import Canvas from '../canvas/Canvas'
import CanvasTools from '../canvas/CanvasTools'
import {pixelParser, rgbToHex} from '../canvas/color_functions'

function HomePage() {

    const [pixelSize, setPixelSize] = useState(5)
    const [height, setHeight] = useState(1000)
    const [width, setWidth] = useState(1000)
    const [color, setColor] = useState([180,180,180])
    const [grid, setGrid] = useState()
    const [finalGrid, setFinalGrid] = useState(grid)
    const draw = ctx => {
        pixelParser(ctx, pixelSize, grid)
      }

    const options = {
        width,
        height,
        pixelSize,
        grid,
        setGrid,
        color,
        finalGrid,
        setFinalGrid
    }

    return (
        <>
            <CanvasTools setColor={setColor} color={color}/>
            <Canvas draw={draw} options={options}/>
        </>
    );
}
export default HomePage;
