import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import './styles/products.css';
import { setProductChoice } from '../actions'

class Products extends React.Component { 
  render() {

    console.log('+++++++++++++this.props: ', this.props);

    return (
      <Fragment>
        <section className="product3">
        <h5>DESIGNER'S LOBBY</h5>
          <div className="thumb">
            <Link to="/product"><img className="thumbnail" src="../img/_DSC3098_square.jpg" alt=""/></Link>
          </div> 
          <button className="arrangeButton">
            <Link style={{display: 'block', height: '100%'}} to="/product/" onClick={this.props.setChoiceP3 } >SELECT</Link>
          </button>
        </section>
        <section className="product2">
          <h5>DESIGNER'S CHOICE</h5>
          <div className="thumb">
            <Link to="/product"><img className="thumbnail" src="../img/_DSC2980.png" alt=""/></Link>
          </div> 
          <button className="arrangeButton">
            <Link style={{display: 'block', height: '100%'}} to="/product/" onClick={this.props.setChoiceP2} >SELECT</Link>
          </button>
        </section>
        <section className="product1">
          <h5>DESIGNER'S BOUQUET</h5>
          <div className="thumb">
            <Link to="/product"><img className="thumbnail" src="../img/_DSC3345.png" alt=""/></Link>
          </div> 
          <button className="arrangeButton">
            <Link style={{display: 'block', height: '100%'}} to="/product/" onClick={this.props.setChoiceP1 } >SELECT</Link>
          </button>
        </section>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {

  return {
    setChoiceP3: () => {
      const productObj = {};
      productObj.productCode = 'p3';
      productObj.productName = "DESIGNER'S LOBBY";
      productObj.productPhoto = "../img/_DSC3098_square.jpg";
      productObj.productPrice = "$40";
      productObj.productDesc = "Our Wrap is a great choice for arranging in a favorite vase";
      dispatch(setProductChoice('productObj'))
    },
    setChoiceP2: () => {
      const productObj = {};
      productObj.productCode = 'p2';
      productObj.productName = "DESIGNER'S CHOICE";
      productObj.productPhoto = "../img/_DSC29890.png";
      productObj.productPrice = "$40";
      productObj.productDesc = "Our Wrap is a great choice for arranging in a favorite vase";
      dispatch(setProductChoice('productObj'))
    },
    setChoiceP1: () => {
      const productObj = {};
      productObj.productCode = 'p1';
      productObj.productName = "DESIGNER'S WRAP";
      productObj.productPhoto = "../img/_DSC3345.png";
      productObj.productPrice = "$40";
      productObj.productDesc = "Our Wrap is a great choice for arranging in a favorite vase";
      dispatch(setProductChoice('productObj'))
    }
  };
};

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null,
  subscription:  state.subscription
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default connect(mapStateToProps, mapDispatchToProps)(Products);

