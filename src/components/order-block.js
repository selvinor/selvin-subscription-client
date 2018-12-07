import React from 'react';
import {connect} from 'react-redux';
import ProductBlock from './product-block';
//import './styles/order-block.css';

class OrderBlock extends React.Component {

  render() {
    console.log('order block props: ', this.props);
    return (
      <div className="orderBlock">
        <ProductBlock product={this.props.subscription.productCode}/>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.User !== null,
  subscription:  state.subscription
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default connect(mapStateToProps)(OrderBlock);
