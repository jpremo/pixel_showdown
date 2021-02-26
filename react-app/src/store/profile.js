const CLEARUSERIMAGES = '/profile/clearCompetitions'
const USERIMAGES = '/profile/competitionPage'
const SET_USER = '/profile/setUser'
const CLEAR_SET_USER = '/profile/clearSetUser'
//These functions/reducer handle post data storage

export const clearUserImages = () => ({
    type: CLEARUSERIMAGES
});

export const userImages = (data) => ({
    type: USERIMAGES,
    payload: { ...data }
});

export const setProfileUser = (user) => ({
    type: SET_USER,
    payload: user
});

export const clearProfileUser = () => ({
    type: CLEAR_SET_USER,
});

const initialState = {
};

function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case USERIMAGES:
            newState = Object.assign({}, state, { ...action.payload });
            return newState;
        case SET_USER:
            newState = Object.assign({}, state, action.payload);
            return newState;
        case CLEARUSERIMAGES:
            newState = Object.assign({}, state, { });
            return newState;
        case CLEAR_SET_USER:
            newState = Object.assign({}, state, {  });
            return newState;
        default:
            return state;
    }
}

export default reducer;
