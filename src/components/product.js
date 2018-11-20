import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
//import './styles/product.css';
import { setProductChoice } from '../actions'

class Product extends React.Component { 
  render() {
  console.log('product.js line 8 props: ', (this.props.subscription));
  // decide which dispatch to issue
  const choice = this.props.subscription.currentProductCode;
    return (
      <Fragment>
        <section className="product">
        <button className="arrangeButton">
          <Link style={{display: 'block', height: '100%'}} to="/products/">BACK</Link>
        </button>
          <div className="productDetail">
            <h3>{this.props.subscription.currentProductName}</h3> 
            <div>
              <Link style={{display: 'block', height: '100%'}} to="/subscriptionAdd/"><img src={this.props.subscription.currentProductPhoto} alt=""/></Link>              
            </div>
            <p className="productDetailPrice">Starting at: ${this.props.subscription.currentProductPrice}</p>
            <p className="productDetailDesc">{this.props.subscription.currentProductDesc}</p> 
              <button className="arrangeButton">
                <Link style={{display: 'block', height: '100%'}} to="/subscriptionAdd/" >Choose</Link>
              </button>
              <span className="price"></span>
          </div>                
        </section>
      </Fragment>
    )
  }
}
const mapDispatchToProps = dispatch => {

  return {
    setChoice: () => {
      dispatch(setProductChoice())
    }

  };
};
const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null,
  subscription:  state.subscription
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default connect(mapStateToProps, mapDispatchToProps)(Product);