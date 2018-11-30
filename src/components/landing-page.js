import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { showLogin } from '../actions';
import LoginForm from './login-form';
import './styles/landing.css';

export function LandingPage(props) {
  // If we are logged in redirect straight to the user's dashboard
// Log the initial state
console.log('props: ', props)
    if (props.loggedIn) {
      return <Redirect to="/dashboard" />;
    }
    const WrappedLink = (<button className="jump"><Link to="/products" >New Subscription</Link></button>);  
    const loginButton = (<button className="jump" onClick={() => props.dispatch(showLogin())} type="button">My Account</button>);
    const landing = (
    <section className="landing-section">
      <div className="landing">
        <h2>Welcome!</h2> 
        <p>Blooms Subscriptions provide an easy way to keep your home or office bright and beautiful!</p>
        <p>We will deliver freshly prepared, gorgeous flower products straight to your home or office on a regular schedule!</p>
        <p>All you need to do is set your flower preferences and delivery details, and that’s it!</p>
        <p>Click the button, and we'll get you set up right away!</p>
        <div className="entry">{WrappedLink} {loginButton}</div>
      </div>
    </section>);
    console.log('props: ', props);
    if (props.showLogin === true) {
      return (
        <div className="home">
          {landing}
          <LoginForm />
        </div>
      );
    } else {
      return (
        <div className="home">
          {landing}
        </div>
      );
    }

}

const mapStateToProps = state => ({
  showLogin: state.subscription.showLogin,
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
