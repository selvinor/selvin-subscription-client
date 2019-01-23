import { API_BASE_URL } from '../config';

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
export const setSection = (section) => ({
    type: JUMP_TO_SECTION, 
    section
});
export const ADD_RECEIVER_TO_SUBSCRIPTION = 'ADD_RECEIVER_TO_SUBSCRIPTION';
export const addReceiverToSubscription = (receiver) => ({
    type: ADD_RECEIVER_TO_SUBSCRIPTION, 
    receiver
});
export const SET_NUMBER_OF_DELIVERIES = 'SET_NUMBER_OF_DELIVERIES';
export const setNumberOfDeliveries = (numberOfDeliveries) => ({
    type: SET_NUMBER_OF_DELIVERIES,
    numberOfDeliveries
});
export const SET_PRODUCT_CHOICE = 'SET_PRODUCT_CHOICE';
export const setProductChoice = (productCode) => ({
    type: SET_PRODUCT_CHOICE,
    productCode
});
export const SET_FREQUENCY = 'SET_FREQUENCY';
export const setFrequency = (frequency) => ({
    type: SET_FREQUENCY,
    frequency
});
export const SET_DURATION = 'SET_DURATION';
export const setDuration = (duration) => ({
    type: SET_DURATION,
    duration
});

export const SET_DELIVERY_DATE = 'SET_DELIVERY_DATE';
export const setDeliveryDate = (deliveryDate) => ({
    type: SET_DELIVERY_DATE,
    deliveryDate
});

export const LOAD_TEST_DATA = 'LOAD_TEST_DATA';
export const loadTestData = (testData) => ({
    type: LOAD_TEST_DATA,
    testData
});

export const SHOW_LOGIN = 'SHOW_LOGIN';
export const showLogin = () => ({
    type: SHOW_LOGIN
});

// Async actions

export const addSubscription = () => dispatch => {
  fetch(`${API_BASE_URL}/api/subscriptions`)
  .then(res => {
      if (!res.ok) {
          return Promise.reject(res.statusText);
      }
      return res.json();
  }).then(newSubscription => {
      dispatch(addSubscriptionSuccess(newSubscription));
  });
};