import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
///import SubscriptionAddForm from './components/subscription-add-form';
import App from './components/app';
//import  FilterableSubscriptionList from './components/filterable-subs-list';


ReactDOM.render(
  <Provider store={store}>
    <Router>
        <App />   
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker(); 
