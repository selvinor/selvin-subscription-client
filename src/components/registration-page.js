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
      // console.log('logged in registration page current.productCode: ', this.props.current.productCode);
      const destination= "/products/" + this.props.current.productCode;
      return <Redirect to={destination} />;
    }
    return (
      <Fragment>
        <section id="main">
          <HeaderBar />

          <section className="registration-section">
            <h2>Register</h2>
            <RegistrationForm />
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
          </section>  
        </section>  
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  current:  state.subscription
});

export default connect(mapStateToProps)(RegistrationPage);
