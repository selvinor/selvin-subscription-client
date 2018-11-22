import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
//import './styles/product.css';
import { setProductChoice } from '../actions'

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
  

  // if (pCode === '1') {
  //   const productName = "Designer's Bouquet";
  // } else {
  //   if (pCode === '2') {
  //     const productName = "Designer's Choice Product";
  //   } else {
  //     if (pCode === '3') {
  //       const productName = "Designer's Lobby Product";
  //     }
  //   }
  // }
//  const frequency = this.props.frequency;
//  const duration = this.props.duration;

    return (
      <Fragment>
        <section className="product">
        <button className="arrangeButton">
          <Link style={{display: 'block', height: '100%'}} to="/products/">BACK</Link>
        </button>
          <div className="productDetail">
            <h3>{this.props.current.productName}</h3> 
            <div>
              <Link style={{display: 'block', height: '100%'}} to={to}><img src={this.props.current.productPhoto} alt=""/></Link>              
            </div>
            <p className="productDetailPrice">Starting at: ${this.props.current.productPrice}</p>
            <p className="productDetailDesc">{this.props.current.productDesc}</p> 
              <button className="arrangeButton">
               { <Link style={{display: 'block', height: '100%'}} to={to} >Choose</Link>}
              </button>
              $<span className="price"></span>
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
  loggedIn: state.auth.User !== null,
  current:  state.subscription
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default connect(mapStateToProps, mapDispatchToProps)(Product);