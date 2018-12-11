import React from 'react';
import {connect} from 'react-redux';
//import './styles/product-block.css';

export class ProductBlock extends React.Component {
  render() {
// console.log('productBlock - this.props: ', this.props);
    return (
      <div className="productBlock">
      <h5 className="productTitle">PRODUCT</h5>
        <ul>
          <li><span className="title">Product: </span>{this.props.product.code}</li>
          <li><span className="title">Description: </span>{this.props.product.desc}</li>
          <li><span className="title">Image: </span>{this.props.product.image}</li>
          <li><span className="title">Price: </span>{this.props.product.price}</li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.User !== null,
  current:  state.subscription
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking

export default connect(mapStateToProps)(ProductBlock);