import { resetSketch } from "../components/utils";

//This reducer stores information about the canvas being drawn on
const CHANGE_PROPERTY = 'canvas/changeProperty';
const CHANGE_RULESET = 'canvas/changeRuleset';

//Changes property specified in payload
export const changeProperty = (payload) => ({
  type: CHANGE_PROPERTY,
  payload
});

export const changeRuleset = (value, key) => ({
  type: CHANGE_RULESET,
  value,
  key
});

const initialState = resetSketch()
// {
//   pixelSize: 20,
//   height: 32,
//   width: 32,
//   color: [0, 180, 0, 1],
//   grid: [{}, {}, {}, {}, {}, {}, {}, {}],
//   currentGrid: {},
//   finalGrid: {},
//   moveHistory: [[{}], [{}], [{}], [{}], [{}], [{}], [{}], [{}]],
//   historyPosition: [0, 0, 0, 0, 0, 0, 0, 0],
//   displayGrid: false,
//   currentTool: 'brush',
//   brushSize: 1,
//   colorPalette: ["#f44336ff", "#e91e63ff", "#9c27b0ff", "#673ab7ff", "#3f51b5ff", "#2196f3ff", "#03a9f4ff", "#00bcd4ff", "#009688ff", "#4caf50ff", "#8bc34aff", "#cddc39ff", "#ffeb3bff", "#ffc107ff", "#ff9800ff", "#ff5722ff", "#795548ff", "#607d8bff"],
//   alphaPickerAllowed: true,
//   colorPaletteAllowed: true,
//   customColorAllowed: true,
//   title: 'Title',
//   editing: null,
//   fps: 1,
//   totalFrames: 1,
//   currentFrame: 1,
//   ruleset: {}
// }

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case CHANGE_PROPERTY:
      newState = Object.assign({}, state, action.payload);
      return newState;
    case CHANGE_RULESET:
      const newRuleset = Object.assign({}, state.ruleset);
      newRuleset[action.key] = action.value
      newState = Object.assign({}, state);
      newState.ruleset = newRuleset
      return newState;
    default:
      return state;
  }
}

export default reducer;
