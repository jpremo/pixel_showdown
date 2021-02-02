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
    displayGrid: true,
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
