const LOGIN = '/modal/login'
const SIGNUP = '/modal/login'
const INCOMPLETE = 'modal/incomplete'
const TEXT = 'modal/text'
const DOWNLOAD = 'modal/download'

export const setLoginModal = (bool) => ({
    type: LOGIN,
    payload: { login: bool }
});

export const setDownloadModal = (bool) => ({
    type: DOWNLOAD,
    payload: { download: bool }
});

export const setSignupModal = (bool) => ({
    type: SIGNUP,
    payload: { signup: bool }
});

export const setIncompleteModal = (bool) => ({
    type: INCOMPLETE,
    payload: { incomplete: bool }
})

export const setTextModal = (bool) => ({
    type: TEXT,
    payload: { text: bool }
})



const initialState = { login: false, signup: false, incomplete: false, text: false };

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
        default:
            return state;
    }
}

export default reducer;
