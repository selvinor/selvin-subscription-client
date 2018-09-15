//import {applyMiddleware as dispatch} from "redux";
export const SUBSCRIPTIONS_HAS_ERRORED = 'SUBSCRIPTIONS_HAS_ERRORED';
export const subscriptionsHasErrored = (hasErrored) => ({
    type: SUBSCRIPTIONS_HAS_ERRORED,
    hasErrored
});
export const SUBSCRIPTIONS_IS_LOADING = 'SUBSCRIPTIONS_IS_LOADING'; 
export const subscriptionsIsLoading = (isLoading) => ({
    type: SUBSCRIPTIONS_IS_LOADING,
    isLoading
});
export const ADD_SUBSCRIPTION_SUCCESS = 'ADD_SUBSCRIPTION_SUCCESS'; 
export const addSubscriptionSuccess = (newSubscription) => ({
    type: ADD_SUBSCRIPTION_SUCCESS,
    newSubscription
});
export const FETCH_SUBSCRIPTION_SUCCESS = 'FETCH_SUBSCRIPTION_SUCCESS';
export const fetchSubscriptionSuccess = (subscriptions) => ({
    type: FETCH_SUBSCRIPTION_SUCCESS,
    subscriptions
});
export const JUMP_TO_SECTION = 'JUMP_TO_SECTION';
export const jumpToSection = (section) => ({
    type: JUMP_TO_SECTION, 
    section
});

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