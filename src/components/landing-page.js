import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import SubscriptionAddForm from './subscription-add-form';
import LoginForm from './login-form';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    const formButton = ( <button className="jump"  onClick={() => <Redirect to="/arrangements" />}  type="button">Get Started</button>); 
    return (
        <div className="home">
              <section>
              <div className="landing">
                <h2>Subscriptions</h2> 
                <p>Blooms provides an easy way to keep your home or office bright and beautiful!</p>
                <p>We will prepare gorgeous, fresh flower arrangements and deliver them straight to your home or office on a regular schedule!</p>
                <p>All you need to do is set your flower preferences and delivery details, and that’s it!</p>
                <p>Click the button, and we'll get you set up right away!</p>
                <div className="entry">{formButton}</div>
              </div>
              </section>

            <LoginForm />
            <Link to="/register">Register</Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
