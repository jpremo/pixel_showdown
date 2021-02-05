export function updateGrid(drawGrid, canvasSettings, dispatch, changeProperty) {
    if (Object.keys(drawGrid).length) {
        const newGrid = { ...canvasSettings.currentGrid, ...drawGrid }
        for (let key in newGrid) {
            if (newGrid[key] === 'deleted' || newGrid[key][3] === 0) {
                delete newGrid[key]
            }
        }
        const newPosition = canvasSettings.historyPosition[canvasSettings.currentFrame - 1] + 1
        const newPositionFinal = [...canvasSettings.historyPosition]
        newPositionFinal[canvasSettings.currentFrame-1] = newPosition
        const newMoveHistory = [...canvasSettings.moveHistory[canvasSettings.currentFrame - 1].slice(0, newPosition), drawGrid]
        const newMoveHistoryFinal = [...canvasSettings.moveHistory]
        newMoveHistoryFinal[canvasSettings.currentFrame - 1] = newMoveHistory
        const wholeGridCopy = [...canvasSettings.grid]
        wholeGridCopy[canvasSettings.currentFrame - 1] = newGrid
        dispatch(changeProperty({ currentGrid: newGrid, grid: wholeGridCopy, moveHistory: newMoveHistoryFinal, historyPosition: newPositionFinal }))
    }
}
