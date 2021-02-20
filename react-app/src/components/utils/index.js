import { changeProperty } from '../../store/canvas'
import { format } from 'date-fns'
//Resets redux store is sketch nav-button is pressed
export const resetSketch = (dispatch) => {
    const initialSettings = {
        pixelSize: 20,
        height: 32,
        width: 32,
        brushSize: 1,
        currentTool: 'brush',
        color: [180, 180, 180, 1],
        grid: [{}, {}, {}, {}, {}, {}, {}, {}],
        colorPalette: ["#f44336ff", "#e91e63ff", "#9c27b0ff", "#673ab7ff", "#3f51b5ff", "#2196f3ff", "#03a9f4ff", "#00bcd4ff", "#009688ff", "#4caf50ff", "#8bc34aff", "#cddc39ff", "#ffeb3bff", "#ffc107ff", "#ff9800ff", "#ff5722ff", "#795548ff", "#607d8bff"],
        defaultPalette: ["#f44336ff", "#e91e63ff", "#9c27b0ff", "#673ab7ff", "#3f51b5ff", "#2196f3ff", "#03a9f4ff", "#00bcd4ff", "#009688ff", "#4caf50ff", "#8bc34aff", "#cddc39ff", "#ffeb3bff", "#ffc107ff", "#ff9800ff", "#ff5722ff", "#795548ff", "#607d8bff"],
        currentGrid: {},
        finalGrid: {},
        moveHistory: [[{}], [{}], [{}], [{}], [{}], [{}], [{}], [{}]],
        historyPosition: [0, 0, 0, 0, 0, 0, 0, 0],
        editing: null,
        editLink: null,
        title: 'Title',
        fps: 1,
        totalFrames: 1,
        currentFrame: 1,
        ruleset: {}
    }

    if (dispatch) {
        dispatch(changeProperty(initialSettings));
    }
    return initialSettings
}


export const longFormattedTime = (time) => {
    return `${format(new Date(time), 'eeee, MMMM do yyyy')} at ${format(new Date(time), 'hh:mm a')}`
}
