import React from 'react';
import ProductBlock from './product-block';
import ScheduleBlock from './schedule-block';
import RecipientBlock from './recipient-block';
import './styles/order-block.css';

export default class OrderBlock extends React.Component {

  render() {
    return (
      <div className="orderBlock">
      <h5 className="orderTitle">ORDER #{this.props.orderNum}</h5>
        <RecipientBlock recipient={this.props.order.recipient}/>
        <ProductBlock product={this.props.order.product}/>
        <ScheduleBlock schedule={this.props.order.schedule}/>
      </div>
    );
  }
}
