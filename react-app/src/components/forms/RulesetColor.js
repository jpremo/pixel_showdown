import React, { useEffect, useState } from 'react';
import { changeProperty, changeRuleset } from '../../store/canvas'
import { useDispatch, useSelector } from 'react-redux';
import { rgbaToHex } from '../canvas/color_functions'
import { SketchPicker, CirclePicker } from 'react-color'
//This component creates a -/input/+ box for the canvas property specified in props
const RulesetColor = ({ property, title }) => {
    const canvasSettings = useSelector(state => state.canvas)
    const dispatch = useDispatch()
    const [deleteColor, setDeleteColor] = useState(false) //controls whether user is deleting colors in palette
    const [stateColor, setStateColor] = useState({ //current color selected
        r: 0,
        g: 0,
        b: 0,
        a: 1
    })

    let colArr = [
        stateColor.r,
        stateColor.g,
        stateColor.b,
        stateColor.a,
    ]


    const [colorPalette, setColorPalette] = useState(["#f44336ff", "#e91e63ff", "#9c27b0ff",
        "#673ab7ff", "#3f51b5ff", "#2196f3ff", "#03a9f4ff", "#00bcd4ff", "#009688ff", "#4caf50ff", "#8bc34aff", "#cddc39ff",
        "#ffeb3bff", "#ffc107ff", "#ff9800ff", "#ff5722ff", "#795548ff", "#607d8bff"])

    useEffect(() => {
        dispatch(changeProperty({ colorPalette }))
        dispatch(changeRuleset(colorPalette, 'defaultPalette'))
    }, [colorPalette])

    const removeFromPalette = colorPalette.length === 1 ? ' invalid-selection' : ''
    const addToPalette = colorPalette.includes(rgbaToHex(colArr)) ? ' invalid-selection' : ''
    const removeFromPalette2 = deleteColor ? ' deleting' : ''
    const removeFromPalette3 = deleteColor ? ' selected' : ''

    //Changes color state during color selection process
    const colorState = (e) => {
        setStateColor(e.rgb)
    }

    //Adds the current color to the palette providing it is not already in the palette
    const addColor = () => {
        if (!addToPalette) {
            const newPalette = [...colorPalette, rgbaToHex(colArr)]
            setColorPalette(newPalette)
        }
    }

    //Toggles whether user is in delete color from palette mode
    const removeColor = () => {
        if (!removeFromPalette) {
            setDeleteColor(!deleteColor)
        }
    }

    //Removes the selected palette color provided the user is in delete color mode
    const deleteSelectedColor = (e) => {
        if (deleteColor && !e.target.children.length) {
            const color = e.target.attributes[0].nodeValue
            const arr = [...colorPalette]
            const arrInd = arr.indexOf(color)
            if (arrInd !== -1) {
                arr.splice(arrInd, 1)
            }
            setColorPalette(arr)
            if (arr.length === 1) setDeleteColor(false)
        }
    }

    return (
        <div className='ruleset-color-wrapper'>
            <SketchPicker
                color={stateColor}
                onChange={colorState}
                // onChangeComplete={colorChange}
                presetColors={[]}
                width='238px'
                className='canvas-tools-custom'
            />
            <div>
                <h2 className='color-select-title'>Default Palette Colors</h2>
                <div className='canvas-tools-circle' onMouseUp={deleteSelectedColor}>
                    <CirclePicker
                        color={stateColor}
                        // onChangeComplete={colorChange}
                        colors={colorPalette}
                        className={removeFromPalette2}
                    />
                </div>
                <div className='canvas-tools-container'>
                    <button className={'canvas-button' + addToPalette} onClick={addColor}>Add Color</button>
                    <button className={'canvas-button' + removeFromPalette + removeFromPalette3} onClick={removeColor}>Remove Color</button>
                </div>
            </div>
        </div>
    );
}

export default RulesetColor;
