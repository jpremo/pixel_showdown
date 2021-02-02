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
    colorPalete: ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"],
    alphaPickerAllowed: true,
    colorPaleteAllowed: true,
    customColorAllowed: true
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
