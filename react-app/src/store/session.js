import { authenticate, demoLogin } from '../services/auth'

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const ADD_RULESET = 'session/addRuleset'
const ADD_FOLLOW = 'session/addFollow'
const REMOVE_FOLLOW = 'session/removeFollow'
//These functions/reducer handle session information and user information

export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const addRuleset = (rules) => ({
  type: ADD_RULESET,
  payload: rules
});

export const addFollow = (id) => ({
  type: ADD_FOLLOW,
  payload: id
});

export const removeFollow = (id) => ({
  type: REMOVE_FOLLOW,
  payload: id
});

export const removeUser = () => ({
  type: REMOVE_USER
});

export const restoreUser = () => async (dispatch) => {
  let res = await authenticate();
  let data = res
  if (data.errors) data = { id: null }
  dispatch(setUser(data));
  return res;
};

export const loginDemoUser = () => async (dispatch) => {
  let res = await demoLogin();
  let data = res
  if (data.errors) data = { id: null }
  dispatch(setUser(data));
  return res;
};

export const followUser = (follower, following) => async (dispatch) => {
  const response = await fetch('/api/users/follow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      follower,
      following
    })
  });
  if (response.ok) {
    dispatch(addFollow(following));
  }
};

export const unFollowUser = (follower, following) => async (dispatch) => {
  const response = await fetch('/api/users/follow', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      follower,
      following
    })
  });
  if (response.ok) {
    dispatch(removeFollow(following));
  }
};

const initialState = { user: { id: null } };

function reducer(state = initialState, action) {
  let newState;
  const userCopy = { ...state.user }
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state, { user: action.payload });
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state, { user: { id: null } });
      return newState;
    case ADD_RULESET:
      userCopy.rulesets.push(action.payload)
      newState = Object.assign({}, state, { user: userCopy });
      return newState;
    case ADD_FOLLOW:
      userCopy.followings.push(action.payload)
      newState = Object.assign({}, state, { user: userCopy });
      return newState;
    case REMOVE_FOLLOW:
      userCopy.followings = userCopy.followings.filter((el) => {
        return el !== action.payload
      })
      newState = Object.assign({}, state, { user: userCopy });
      return newState;
    default:
      return state;
  }
}

export default reducer;
