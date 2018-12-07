import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import './styles/products.css';
import { setProductChoice } from '../actions'
import HeaderBar from './header-bar';

class Products extends React.Component { 

  render() {

    return (
      <Fragment>
      
      <section id="main">
        <HeaderBar />
        <section id="productChoice">
          <div className="products product3">   
            <div className="productSel thumb">
            <Link to="/products/p3"><div id="p3Thumb" onClick={this.props.setChoiceP3 }></div></Link>
                
              
            </div> 
            <div className="productSel description">
              <div className="productInfo">
                <h3>Designer's Lobby</h3>
              </div>
              <div className="productSel">
                <button className="arrangeButton selectButton">
                  <Link style={{display: 'block', height: '100%'}} to="/products/p3" onClick={this.props.setChoiceP3 } >SELECT</Link>
                </button>
              </div>
            </div>  
          </div>
          <div className="products product2">   
            <div className="productSel thumb">
              <Link to="/products/p2"><div id="p2Thumb" onClick={this.props.setChoiceP2 }></div></Link>             
            </div> 
            <div className="productSel description">
              <div className="productInfo">
                <h3>Designer's Choice</h3>
              </div>
              <div className="productSel">
                <button className="arrangeButton  selectButton">
                  <Link style={{display: 'block', height: '100%'}} to="/products/p2" onClick={this.props.setChoiceP2 } >SELECT</Link>
                </button>
              </div> 
            </div> 

          </div>
          <div className="products product1">   
            <div className="productSel thumb">
              <Link to="/products/p1"><div id="p1Thumb" onClick={this.props.setChoiceP1 }></div></Link>             
            </div> 
            <div className="productSel description">
              <div className="productInfo">
                <h3>Designer's Wrap</h3>
              </div>
              <div className="productSel">
                <button className="arrangeButton selectButton">
                  <Link style={{display: 'block', height: '100%'}} to="/products/p1" onClick={this.props.setChoiceP1 } >SELECT</Link>
                </button>
              </div> 
            </div> 
          </div>
        </section>
      </section>
    </Fragment>
    );
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
export default connect(mapStateToProps, mapDispatchToProps)(Products);

