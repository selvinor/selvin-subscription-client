import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import HeaderBar from './header-bar';
import RegistrationForm from './registration-form';
import './styles/registration.css';

export class RegistrationPage extends React.Component {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
  render() {
    
    if (this.props.loggedIn) {
      let destination= "/products";
      // console.log('logged in registration page current.productCode: ', this.props.current.productCode);
      if (this.props.current.productCode !== null) {
        destination= "/products/" + this.props.current.productCode;
      } 
      return <Redirect to={destination} />;
    }
    return (
      <Fragment>
        <section id="main">
          <HeaderBar />

          <section className="registration-section">
            <RegistrationForm />

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
