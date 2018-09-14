import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk';

import {subscriptionReducer} from './reducers';

export default createStore(combineReducers({subscriptions:subscriptionReducer}), applyMiddleware(thunk));