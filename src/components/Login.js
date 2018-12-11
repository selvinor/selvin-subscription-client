import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginForm from './login-form';
// import '../styles/forms.css';

export class LogIn extends React.Component {
  componentDidMount() {
    document.title = 'Login | Blooms Subscriptions';
    // console.log('login props current: ', this.props.current);
  }
  
  render() {
    if (this.props.loggedIn) {
      // console.log('logged in props current.productCode: ', this.props.current.productCode);
      const destination= "/products";
      return <Redirect to={destination} />;
    }

    return (
      <main aria-live="assertive" className="main textCenter" role="main">
        <LoginForm />
      </main>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  current:  state.subscription
});

export default connect(mapStateToProps)(LogIn);
