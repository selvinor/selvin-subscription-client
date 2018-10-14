import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

import HeaderBar from './header-bar';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import RegistrationPage from './registration-page';
import {refreshAuthToken} from '../actions/auth';
//import {deleteAuthToken} from '../actions/auth';
import {showLogoutWarning} from '../actions/auth';

export class App extends React.Component {
  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate', Date.now());
    if (!prevProps.loggedIn && this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
      this.startPeriodicLogout();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    console.log('startPeriodicRefresh: ', Date.now());
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      10 * 60 * 1000 // One hour
    );
  }

  startPeriodicLogout() {
    console.log('startPeriodicLogout: 2 min countdown', Date.now());

    this.refreshInterval = setTimeout(
      // () => this.props.dispatch(deleteAuthToken()), 
      //   5 * 60 * 1000 // 5 mins    
      () => console.log('2 minute logout timer expiration', Date.now()), 
      2 * 60 * 1000 // 5 mins        
    );
    setTimeout(
      () => this.props.dispatch(showLogoutWarning()), 
        1 * 60 * 1000 );
        
    console.log('showLogoutWarning: ', Date.now());  // 4 mins  
      // () => console.log('4 minute timer'), 
      // 4 * 60 * 1000 );// 4 mins  
  }
 
  stopPeriodicRefresh() {
    console.log('stopPeriodicRefresh: ', Date.now());

    if (!this.refreshInterval) {
        return;
    }

    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <div className="app">
        <HeaderBar />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/register" component={RegistrationPage} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
