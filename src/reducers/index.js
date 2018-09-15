import * as actions from '../actions';

const initialState = {
  subscriptions: [],
  hasErrored : false,
  isLoading : false,
  arrangementChosen : false,
  subscriptionChosen: false,
  recipientsChosen: false,
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
    case 'CREATE_SUBSCRIPTION':
    return Object.assign({}, state, {
      createSubscription: action.createSubscription
    });
    case 'SET_CURRENT_FORM_SECTION':
    return Object.assign({}, state, {
      setCurrentFormSection: action.setCurrentFormSection
    });
    default:
        return state;
  }
}  

export const recipientReducer = (state=initialState, action) => {
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
        recipients: action.fetchRecipientsSuccess
      });
    default:
        return state;
  }
}  
