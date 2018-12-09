import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import HeaderBar from './header-bar';
import RegistrationForm from './registration-form';
import './styles/registration.css';

export class RegistrationPage extends React.Component {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
  render() {
    if (this.props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
      <Fragment>
        <section id="main">
          <HeaderBar />

          <section className="registration-section">
            <h2>Register</h2>
            <RegistrationForm />
            <p>Already have an account? Go to the <Link to="/login">login page</Link></p>
          </section>  
        </section>  
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
