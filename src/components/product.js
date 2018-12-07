import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import './styles/product.css';
import { setProductChoice } from '../actions'
import HeaderBar from './header-bar';

class Product extends React.Component { 
  componentDidMount() {
    if (!this.props.loggedIn) {
      return <Redirect to="/landing" />;
    }
    console.log('Products: product is: ', this.props.match.params.pCode);
    if(!this.props.current.productCode) {     
      setProductChoice(this.props.match.params.pCode);
    }
  }
  
  render() {

    let to;
  console.log('product.js  props: ', (this.props));
  console.log('this.props.loggedIn: ', this.props.loggedIn);
  const { pCode } = this.props.match.params  // decide which dispatch to issue
  if (this.props.loggedIn) {
    to = '/subscriptionAdd/' + pCode;
  } else {
    to = '/login';
  }

    return (
      <Fragment>  
      <section id="product-main">

        <section id="product-section">  

          <button className="product-back-button">
            <Link style={{display: 'block', height: '100%'}} to="/products/">BACK</Link>
          </button>
          <HeaderBar />
          <div className="product">
            <div className="productDetail">
              <div className="product-shot">
                <Link style={{display: 'block', height: '100%'}} to={to}><img src={this.props.current.productPhoto} alt=""/></Link>              
              </div>
              <h3>{this.props.current.productName}</h3> 
              <p className="productDetailPrice">Starting at: ${this.props.current.productPrice}</p>
              <p className="productDetailDesc">{this.props.current.productDesc}</p> 
                <button className="arrangeButton">
                { <Link style={{display: 'block', height: '100%'}} to={to} >Choose</Link>}
                </button>
            </div>  
          </div>              
        </section>
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
  loggedIn: state.auth.User !== null,
  current:  state.subscription
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default connect(mapStateToProps, mapDispatchToProps)(Product);