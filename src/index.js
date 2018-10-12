import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import SubscriptionAddForm from './components/subscription-add-form';
//import  FilterableSubscriptionList from './components/filterable-subs-list';


ReactDOM.render(
  <Provider store={store}>
    <div>
      <SubscriptionAddForm />
    </div>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker(); 
