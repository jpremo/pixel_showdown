const RECENT = '/posts/recent'

//These functions/reducer handle post data storage
export const recentCompetitions = (recentCompetitions) => ({
    type: RECENT,
    payload: { recentCompetitions: recentCompetitions.competitions }
});

const initialState = {
    recentCompetitions: null,
 };

function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case RECENT:
            newState = Object.assign({}, state, { ...action.payload });
            return newState;
        default:
            return state;
    }
}

export default reducer;
