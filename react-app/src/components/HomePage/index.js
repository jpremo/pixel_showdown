import React, { useState, useEffect } from "react";
import Canvas from '../canvas/Canvas'
import CanvasTools from '../canvas/CanvasTools'
import {pixelParser, rgbToHex} from '../canvas/color_functions'
import { changeProperty } from '../../store/canvas'
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
    const dispatch = useDispatch()
    const canvasSettings = useSelector(state => state.canvas)
    useEffect(() => {
        const initialSettings = {
            pixelSize: 20,
            height: 32,
            width: 32,
            color: [180,180,180],
            grid: {},
            finalGrid: {}
        }

        dispatch(changeProperty(initialSettings))

    }, [dispatch])

    const [pixelSize, setPixelSize] = useState(50)
    const [height, setHeight] = useState(16)
    const [width, setWidth] = useState(16)
    const [color, setColor] = useState([180,180,180])
    const [grid, setGrid] = useState()
    const [finalGrid, setFinalGrid] = useState(grid)
    const draw = ctx => {
        pixelParser(ctx, canvasSettings.pixelSize, canvasSettings.grid)
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
