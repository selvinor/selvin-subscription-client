import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk';

import {subscriptionReducer, productReducer} from './reducers';

export default createStore(combineReducers({subscriptions:subscriptionReducer, products:productReducer}), applyMiddleware(thunk));