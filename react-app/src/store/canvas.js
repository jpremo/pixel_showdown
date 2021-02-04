const CHANGE_PROPERTY = 'canvas/changeProperty';


export const changeProperty = (payload) => ({
  type: CHANGE_PROPERTY,
  payload
});

const initialState = {
    pixelSize: 20,
    height: 32,
    width: 32,
    color: [0,180,0,1],
    grid: {},
    finalGrid: {},
    moveHistory: [{}],
    historyPosition: 0,
    displayGrid: false,
    currentTool: 'brush',
    brushSize: 1,
    colorPalette: ["#f44336ff", "#e91e63ff", "#9c27b0ff", "#673ab7ff", "#3f51b5ff", "#2196f3ff", "#03a9f4ff", "#00bcd4ff", "#009688ff", "#4caf50ff", "#8bc34aff", "#cddc39ff", "#ffeb3bff", "#ffc107ff", "#ff9800ff", "#ff5722ff", "#795548ff", "#607d8bff"],
    alphaPickerAllowed: true,
    colorPaletteAllowed: true,
    customColorAllowed: true,
    title: 'Title',
    editing: null
}

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case CHANGE_PROPERTY:
      newState = Object.assign({}, state, action.payload );
      return newState;
    default:
      return state;
  }
}

export default reducer;
