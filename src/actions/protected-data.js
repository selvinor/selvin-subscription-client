import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_PROTECTED_DATA_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchProtectedDataSuccess = data => ({
    type: FETCH_PROTECTED_DATA_SUCCESS,
    data
});

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
    type: FETCH_PROTECTED_DATA_ERROR,
    error
});


export const fetchProtectedData = () => (dispatch, getState)  => {
  // console.log('fetch subscriptions fired!');
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}/protected/subscriptions`, {
    method: 'GET',
    headers: {
        // Provide our auth token as credentials
        Authorization: `Bearer ${authToken}`
    }
})
  .then(res => {
      if (!res.ok) {
        // console.log('!!!PROBLEM!!!');
          return Promise.reject(res.statusText);
      }      
      return res.json();
  }).then(data => {
    // let  subscription_data = data;
    // console.log('***** subscription_data: ', subscription_data);
    //subscription_data = Object.keys(data);   
    dispatch(fetchProtectedDataSuccess(data));
  });
  
  // .then(subscriptions => {
  //     dispatch(fetchProtectedDataSuccess(subscriptions));
  // });
};


export const xfetchProtectedData = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/protected/subscriptions/`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({data}) => dispatch(fetchProtectedDataSuccess(data)))
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });
};
