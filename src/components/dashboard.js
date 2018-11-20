import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {refreshAuthToken} from '../actions/auth';
import SubscriptionList from './subscription-list';
// import './styles/dashboard.css'
export class Dashboard extends React.Component {
  // componentDidMount() {
  //     this.props.dispatch(fetchProtectedData());
  // }

  render() {
    // Only render the log out button if we are logged in
    console.log('Logged in - this.props: ' , this.props);
    let stayLoggedInButton;
    if (this.props.showWarning) {
      stayLoggedInButton = (
        <button onClick={() => this.props.dispatch(refreshAuthToken())}>Keep me logged in</button>
      );
    }  
    return (
      <div className="dashboard">
        <ul className="userInfo">
          <li className="dashboard-username">Username: {this.props.user.username}</li>
          <li className="dashboard-name">Name: {this.props.name}</li>
          <li className="dashboard-email">Email: {this.props.user.email}</li>
          <li className="dashboard-phone">Phone: {this.props.user.phone}</li>         
        </ul>
        <div>
          <ul className="dashboard-subscriptions">
            {console.log('this.props.user: ', this.props.user)}
            <SubscriptionList subscriptions={this.props.user.subscriptions} />
          </ul>
        </div>
        <div className="dashboard-warning">
            {stayLoggedInButton}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    console.log('mapStateToProps state: ' , state);

    return {
        user:  state.auth.currentUser,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        showWarning: state.auth.showWarning,
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
