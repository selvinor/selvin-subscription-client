//import {applyMiddleware as dispatch} from "redux";
export const SUBSCRIPTIONS_HAS_ERRORED = 'SUBSCRIPTIONS_HAS_ERRORED';
export function subscriptionsHasErrored(bool) {
  return {
    type: SUBSCRIPTIONS_HAS_ERRORED,
    hasErrored: bool
  };
}
export const SUBSCRIPTIONS_IS_LOADING = 'SUBSCRIPTIONS_IS_LOADING'; 
export function subscriptionsIsLoading(bool) {
  return {
    type: SUBSCRIPTIONS_IS_LOADING,
    isLoading: bool
  };
}
export const ADD_SUBSCRIPTION_SUCCESS = 'ADD_SUBSCRIPTION_SUCCESS'; 
export function addSubscriptionSuccess(newSubscription) {
  return {
    type: ADD_SUBSCRIPTION_SUCCESS,
    subscription: newSubscription
  };
}
export const FETCH_SUBSCRIPTION_SUCCESS = 'FETCH_SUBSCRIPTION_SUCCESS';
export function fetchSubscriptionSuccess(subscriptions) {
  return {
    type: FETCH_SUBSCRIPTION_SUCCESS,
    subscriptions
  };
}
export const fetchSubscriptions = () => dispatch => {
  fetch(`http://localhost:8080/api/subscriptions`)
  .then(res => {
      if (!res.ok) {
          return Promise.reject(res.statusText);
      }
      return res.json();
  }).then(subscriptions => {
      console.log('subscriptions from the fetch', subscriptions);
      dispatch(fetchSubscriptionSuccess(subscriptions));
  });
};

export const addSubscription = () => dispatch => {
  fetch(`http://localhost:8080/api/subscriptions`)
  .then(res => {
      if (!res.ok) {
          return Promise.reject(res.statusText);
      }
      return res.json();
  }).then(newSubscription => {
      console.log('subscription added', newSubscription);
      dispatch(addSubscriptionSuccess(newSubscription));
  });
};