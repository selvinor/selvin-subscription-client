import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import './styles/product.css';
import { setProductChoice } from '../actions'

class Product extends React.Component { 
  render() {
  console.log('product.js line 8 props: ', (this.props.subscription));

    return (
      <Fragment>
        <section className="product">
          <button className="jumpBack"  onClick={() => {return <Redirect to="/products" />}}  type="button">
            BACK
          </button>              
          <div className="productDetail">
            <h3>{this.props.subscription.currentProductName}</h3> 
            <div>
            <img src={this.props.subscription.currentProductPhoto} onClick={() => {setProductChoice('p3')} } alt=""/>
            </div>
            <p className="productDetailPrice">Starting at: ${this.props.subscription.currentProductPrice}</p>
            <p className="productDetailDesc">{this.props.subscription.currentProductDesc}</p> 
            <button className="chooseButton" onClick={() => {
              setProductChoice(this.props.subscription.currentProductCode)
              return <Redirect to="/subscriptionAdd" />}}  
              type="button">SELECT</button><span className="price"></span>
          </div>                
        </section>
      </Fragment>
    )
  }
}
const mapDispatchToProps = dispatch => {

  return {
    setChoiceP3: () => {
      dispatch(setProductChoice('p3'))
    },
    setChoiceP2: () => {
      dispatch(setProductChoice('p2'))
    },
    setChoiceP1: () => {
      dispatch(setProductChoice('p1'))
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