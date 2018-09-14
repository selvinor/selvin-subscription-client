import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { subscriptionReducer } from './reducers'

export default createStore(
    combineReducers({
        form: formReducer,
        subscription: subscriptionReducer
    })
);