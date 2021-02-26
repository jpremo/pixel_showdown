const CLEARUSERIMAGES = '/profile/clearCompetitions'
const USERIMAGES = '/profile/competitionPage'
const SET_USER = '/profile/setUser'
const CLEAR_SET_USER = '/profile/clearSetUser'
const ADD_FOLLOW = '/profile/addFollow'
const REMOVE_FOLLOW = '/profile/removeFollow'
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

export const followUserProfile = (user) => ({
    type: ADD_FOLLOW,
    payload: user
});

export const unFollowUserProfile = (user) => ({
    type: REMOVE_FOLLOW,
    payload: user.id
});

function reducer(state = initialState, action) {
    let newState;
    const profileCopy = {...state}
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
        case ADD_FOLLOW:
            profileCopy.followings.push(action.payload)
            newState = Object.assign({}, state, profileCopy );
            return newState;
        case REMOVE_FOLLOW:
            profileCopy.followings = profileCopy.followings.filter((el) => {
                return el.id !== action.payload
            })
            newState = Object.assign({}, state, profileCopy );
            return newState;
        default:
            return state;
    }
}

export default reducer;
