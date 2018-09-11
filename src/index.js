import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
//import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import store from './store';
import SubscriptionForm from './components/subscription-form';
import SubscriptionList from './components/subscription-list';

ReactDOM.render(


  <Provider store={store}>
    <div>
      <SubscriptionForm />
    </div>
  </Provider>,
  document.getElementById('root')
);

/* <SubscriptionList Subscriptions={Subscriptions}/>, 
document.getElementById('root'));
registerServiceWorker(); */
