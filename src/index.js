import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import SubscriptionAddForm from './components/subscription-add-form';
import RecipientAddForm from './components/recipient-add-form';
import SubscriptionList from './components/subscription-list';

ReactDOM.render(
  <Provider store={store}>
    <div>
      <SubscriptionAddForm />
      <RecipientAddForm />
    </div>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker(); 
