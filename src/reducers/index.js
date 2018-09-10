import * as actions from '../actions';

const initialState = {
  subscriptions: [],
  hasErrored : false,
  isLoading : false

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
    default:
        return state;
  }
}  

export const productReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'PRODUCTS_HAS_ERRORED':
      return Object.assign({}, state, {
        hasErrored: action.hasErrored
      });  
    case 'PRODUCTS_IS_LOADING':
      return Object.assign({}, state, {
        isLoading: action.isLoading
      }); 
    case 'FETCH_PRODUCTS_SUCCESS':
      return Object.assign({}, state, {
        products: action.fetchProductsSuccess
      });
    default:
        return state;
  }
}  
