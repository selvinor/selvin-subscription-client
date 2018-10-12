import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import {refreshAuthToken} from '../actions/auth';
export class Dashboard extends React.Component {
  componentDidMount() {
      this.props.dispatch(fetchProtectedData());
  }

  render() {
    // Only render the log out button if we are logged in
    console.log('this.props: ' , this.props);
    let stayLoggedInButton;
    if (this.props.showWarning) {
      stayLoggedInButton = (
        <button onClick={() => this.props.dispatch(refreshAuthToken())}>Keep me logged in</button>
      );
    }  
    return (
      <div className="dashboard">
        <div className="dashboard-username">
            Username: {this.props.username}
        </div>
        <div className="dashboard-name">Name: {this.props.name}</div>
        <div className="dashboard-protected-data">
            Protected data: {this.props.protectedData}
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
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data,
        showWarning: state.auth.showWarning,

    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
