import React, { useState, useEffect } from "react";
import Canvas from '../canvas/Canvas'
import CanvasTools from '../canvas/CanvasTools'
import {pixelParser, rgbToHex} from '../canvas/color_functions'
import { changeProperty } from '../../store/canvas'
import { useDispatch, useSelector } from "react-redux";
import CompleteCanvas from '../canvas/CompleteCanvas'

function HomePage() {
    return (
        <>
            <h1>Home</h1>
        </>
    );
}
export default HomePage;
