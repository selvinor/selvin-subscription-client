import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import './styles/product.css';
import { setProductChoice } from '../actions'
import HeaderBar from './header-bar';

export class Product extends React.Component { 
  componentDidMount() {
    console.log('product component did mount');
    if (this.props.loggedIn) {
      console.log('this.props.currentUser: ', this.props.currentUser, ' | Products: product is: ', this.props.match.params.pCode);
      if(!this.props.current.productCode) {     
        setProductChoice(this.props.match.params.pCode);
      } 
    } 
  }  
  render() {

  let to;
  let buttonText;
  console.log('product.js  props: ', (this.props));
  console.log('this.props.currentUser: ', this.props.currentUser);
  const { pCode } = this.props.match.params  // decide which dispatch to issue
  if (this.props.loggedIn) {
    to = '/subscriptionAdd/' + pCode;
    buttonText = 'Choose';
  } else {
    to = '/login';
    buttonText = 'Login to continue';
  }

    return (
      <Fragment>  
      <section id="product-main">

        <section id="product-section">  

          <button className="product-back-button">
            <Link style={{display: 'block', height: '100%'}} to="/products/">BACK</Link>
          </button>
          <div className="product-header">
            <HeaderBar />
          </div>
          
          <div className="product">
            <div className="productDetail">
              <div className="product-shot">
                <Link style={{display: 'block', height: '100%'}} to={to}><img src={this.props.current.productPhoto} alt=""/></Link>              
              </div>
              <h3>{this.props.current.productName}</h3> 
              <p className="productDetailPrice">Starting at: ${this.props.current.productPrice}</p>
              <p className="productDetailDesc">{this.props.current.productDesc}</p> 
                <button className="arrangeButton">
                { <Link style={{display: 'block', height: '100%'}} to={to} >{buttonText}</Link>}
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
  loggedIn: state.auth.currentUser !== null,
  currentUser: state.auth.currentUser !== null,
  current:  state.subscription
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default connect(mapStateToProps, mapDispatchToProps)(Product);