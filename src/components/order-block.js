import React from 'react';
import ProductBlock from './product-block';
import ScheduleBlock from './schedule-block';
import RecipientBlock from './recipient-block';
export default class OrderBlock extends React.Component {

  render() {
    const orderList = [];
    console.log('this.props.orders.length:', this.props.orders.length);
    let i=0;
    while( i< this.props.orders.length) {
      console.log('orderBlock this.props.orders[i]:', this.props.orders[i]);
      orderList.push(
        <li className="orderBlock">
          <ProductBlock product={this.props.orders[i].product} key={this.props.orders[i].productCode} />
          <ScheduleBlock schedule={this.props.orders[i].schedule}   key={this.props.orders[i].order.orderNum} />
          <RecipientBlock recipient={this.props.orders[i].recipient} key={this.props.orders[i].recipient.name} />
        </li>
      ); 
      console.log('orderList.length: ', orderList.length);
      i++;
    }
    return (
      <ul className="orderList">
        {orderList}
      </ul>
    );
  }
}
