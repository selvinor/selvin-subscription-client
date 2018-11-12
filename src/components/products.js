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
        
          <div className="thumb" onClick={this.props.setChoiceP3 }>
            <Link to="/product"><img className="thumbnail" src="../img/_DSC3098_square.jpg" alt="" /></Link>
          </div> 
          <div className="productInfo">
            <h5>Designer's lobby</h5>
            <button className="arrangeButton">
              <Link style={{display: 'block', height: '100%'}} to="/product/" onClick={this.props.setChoiceP3 } >SELECT</Link>
            </button>
          </div>
        </section>
        <section className="product2">
         
          <div className="thumb" onClick={this.props.setChoiceP2}>
            <Link to="/product"><img className="thumbnail" src="../img/_DSC2980.png" alt=""/></Link>
          </div> 
          <div className="productInfo">
            <h5>Designer's Choice</h5>
            <button className="arrangeButton">
              <Link style={{display: 'block', height: '100%'}} to="/product/" onClick={this.props.setChoiceP2} >SELECT</Link>
            </button>
          </div> 
        </section>
        <section className="product1">
         
          <div className="thumb" onClick={this.props.setChoiceP1 }>
            <Link to="/product"><img className="thumbnail" src="../img/_DSC3345.png" alt=""/></Link>
          </div> 
          <h5>Designer's Wrap</h5>
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

