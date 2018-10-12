import {
    SET_AUTH_TOKEN,
    CLEAR_AUTH,
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_ERROR,
    SHOW_WARNING
} from '../actions/auth';

const initialState = {
    authToken: null, // authToken !== null does not mean it has been validated
    currentUser: null,
    loading: false,
    error: null,
    showWarning: false
};

export default function reducer(state = initialState, action) {
  console.log('Auth reducer action.type: ', action.type);
  if (action.type === SET_AUTH_TOKEN) {
    return Object.assign({}, state, {
      authToken: action.authToken
    });
  } else if (action.type === CLEAR_AUTH) {
      return Object.assign({}, state, {
        authToken: null,
        currentUser: null
      });
  } else if (action.type === AUTH_REQUEST) {
      return Object.assign({}, state, { 
        loading: true,
        error: null
      });
  } else if (action.type === AUTH_SUCCESS) {
      return Object.assign({}, state, {
        loading: false,
        currentUser: action.currentUser,
        showWarning: false
      });
  } else if (action.type === AUTH_ERROR) {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
  } else if (action.type === SHOW_WARNING) {
      console.log('updating state showWarning to true. action: ', action);
      return Object.assign({}, state, {
        showWarning: true
    });
  }
  console.log('state: ' , state);
  return state;
} 
