const LOGIN = '/modal/login'
const SIGNUP = '/modal/login'
const DOWNLOAD = 'modal/download'
const POST = 'modal/post'
const COMPETITION = 'modal/competition'

//These functions/reducer handle modal display
export const setLoginModal = (bool) => ({
    type: LOGIN,
    payload: { login: bool }
});

export const setSignupModal = (bool) => ({
    type: SIGNUP,
    payload: { signup: bool }
});

export const setDownloadModal = (bool) => ({
    type: DOWNLOAD,
    payload: { download: bool }
});

export const setCreatePostModal = (bool) => ({
    type: POST,
    payload: { post: bool }
})

export const setCreateCompetitionModal = (bool) => ({
    type: COMPETITION,
    payload: { competition: bool }
})



const initialState = { login: false, signup: false, incomplete: false, text: false, competition: false };

function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOGIN:
            newState = Object.assign({}, state, { ...action.payload });
            return newState;
        case SIGNUP:
            newState = Object.assign({}, state, { ...action.payload });
            return newState;
        case DOWNLOAD:
            newState = Object.assign({}, state, { ...action.payload });
            return newState;
        case POST:
            newState = Object.assign({}, state, { ...action.payload });
            return newState;
        case COMPETITION:
            newState = Object.assign({}, state, { ...action.payload });
            return newState;
        default:
            return state;
    }
}

export default reducer;
