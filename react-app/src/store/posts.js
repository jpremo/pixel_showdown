const RECENT = '/posts/recent'
const RECENTCLOSED = '/posts/recentclosed'
const CLEARCOMPETITIONS = '/posts/clearCompetitions'
const CLEARCOMPETITIONPAGE = '/posts/clearCompetitionPage'
const COMPETITIONPAGE = '/posts/competitionPage'
const COMPETITIONWINNERS = '/posts/competitionWinners'
const COMPETITIONPAGEIMAGES = '/posts/competitionPageImages'
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

export const competitionPageImages = (images) => ({
    type: COMPETITIONPAGEIMAGES,
    payload: images.images
});

export const submitCompetitionWinners = (competitionId, competitionWinners) => async (dispatch) => {
    const response = await fetch(`/api/posts/competitions/${competitionId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            competitionWinners
        })
    });
    if (response.ok) {
        // dispatch(clearCompetitionPage())
        const data = await response.json()
        dispatch(competitionPageImages(data));
    }
};

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
        case COMPETITIONPAGEIMAGES:
            const competitionPageCopy = {...state.competitionPage}
            competitionPageCopy.images = action.payload
            competitionPageCopy.judged = true;
            newState = Object.assign({}, state);
            newState.competitionPage = competitionPageCopy
            return newState;
        default:
            return state;
    }
}

export default reducer;
