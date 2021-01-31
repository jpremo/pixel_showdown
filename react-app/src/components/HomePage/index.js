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
            color: [180,180,180,1],
            grid: {},
            finalGrid: {}
        }

        dispatch(changeProperty(initialSettings))

    }, [dispatch])

    const draw = ctx => {
        pixelParser(ctx, canvasSettings.pixelSize, canvasSettings.grid)
      }

    return (
        <>
            <CanvasTools/>
            <Canvas draw={draw}/>
        </>
    );
}
export default HomePage;
