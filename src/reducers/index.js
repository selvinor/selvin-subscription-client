import * as actions from '../actions'; 
const initialState = {
  subscriptions: [],
  hasErrored : false,
  isLoading : false,
  arrangementChosen : false,
  subscriptionChosen: false,
  senderReceiversChosen: false,
  currentFormSection: "arrangement"
}
export const subscriptionReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'SUBSCRIPTIONS_HAS_ERRORED':
      return Object.assign({}, state, {
        hasErrored: action.hasErrored
      });  
    case 'SUBSCRIPTIONS_IS_LOADING':
      return Object.assign({}, state, {
        isLoading: action.isLoading
      }); 
    case 'FETCH_SUBSCRIPTION_SUCCESS':
      return Object.assign({}, state, {
        subscriptions: action.subscriptions
      });
    case 'ADD_SUBSCRIPTION_SUCCESS':
    // Do some stuff to create the subscription from the payload 
    return Object.assign({}, state, {
      subscriptions: [...state.subscriptions, action.newSubscription]
    });
    case 'JUMP_TO_SECTION':
    console.log('JUMP_TO_SECTION reducer called', action);
    return Object.assign({}, state, {
      currentFormSection: action.section
    });
    default:
        return state;
  }
}  

export const senderReceiverReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'RECIPIENTS_HAS_ERRORED':
      return Object.assign({}, state, {
        hasErrored: action.hasErrored
      });  
    case 'RECIPIENTS_IS_LOADING':
      return Object.assign({}, state, {
        isLoading: action.isLoading
      }); 
    case 'FETCH_RECIPIENTS_SUCCESS':
      return Object.assign({}, state, {
        senderReceivers: action.fetchSenderReceiversSuccess
      });
    default:
        return state;
  }
}  
