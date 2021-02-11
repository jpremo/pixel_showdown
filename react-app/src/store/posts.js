const RECENT = '/posts/recent'
const RECENTCLOSED = '/posts/recentclosed'
const CLEARCOMPETITIONS = '/posts/clearCompetitions'
const CLEARCOMPETITIONPAGE = '/posts/clearCompetitionPage'
const COMPETITIONPAGE = '/posts/competitionPage'
//These functions/reducer handle post data storage
export const recentCompetitions = (recentCompetitions) => ({
    type: RECENT,
    payload: { recentCompetitions: recentCompetitions.competitions }
});

export const recentlyClosedCompetitions = (recentCompetitions) => ({
    type: RECENTCLOSED,
    payload: { recentlyClosedCompetitions: recentCompetitions.competitions }
});

export const clearCompetitions = () => ({
    type: CLEARCOMPETITIONS
});

export const clearCompetitionPage = () => ({
    type: CLEARCOMPETITIONPAGE
});

export const competitionPage = (competitionPage) => ({
    type: COMPETITIONPAGE,
    payload: { competitionPage: competitionPage.competition }
});

const initialState = {
    recentCompetitions: null,
    recentlyClosedCompetitions: null,
    competitionPage: null
};

function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case RECENT:
            newState = Object.assign({}, state, { ...action.payload });
            return newState;
        case RECENTCLOSED:
            newState = Object.assign({}, state, { ...action.payload });
            return newState;
        case COMPETITIONPAGE:
            newState = Object.assign({}, state, { ...action.payload });
            return newState;
        case CLEARCOMPETITIONS:
            newState = Object.assign({}, state, { recentlyClosedCompetitions: null, recentCompetitions: null });
            return newState;
        case CLEARCOMPETITIONPAGE:
            newState = Object.assign({}, state, { competitionPage: null });
            return newState;
        default:
            return state;
    }
}

export default reducer;
