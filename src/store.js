// import {createStore, applyMiddleware, combineReducers} from 'redux'
// import thunk from 'redux-thunk';

// import {subscriptionReducer} from './reducers';

// export default createStore(combineReducers({subscriptions:subscriptionReducer}), applyMiddleware(thunk));

import {createStore, combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'

export default createStore(
    combineReducers({
        form: formReducer
    })
);