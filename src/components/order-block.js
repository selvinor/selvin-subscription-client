import React from 'react';
import ProductBlock from './product-block';
import ScheduleBlock from './schedule-block';
import RecipientBlock from './recipient-block';
export default class OrderBlock extends React.Component {

  render() {
    return (
      <div className="orderBlock">
        <ProductBlock product={this.props.order.product}/>
        <ScheduleBlock schedule={this.props.order.schedule}/>
        <RecipientBlock recipient={this.props.order.recipient}/>
      </div>
    );
  }
}
