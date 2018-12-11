import React from 'react';
import OrderBlock from './order-block';
//import './styles/subscription-block.css'
export default class SubscriptionBlock extends React.Component {

  render() {

    const product = {};
    const schedule= {};
    const recipient = {};
    const order={product, schedule, recipient};
    
    console.log('subscriptionBlock - this.props.subscription:', this.props.subscription);
     
      product['code'] = this.props.subscription.productCode;
      product['desc'] = this.props.subscription.productName;
      product['image'] = this.props.subscription.productImage;
      product['price'] = this.props.subscription.productPrice;
      product['status'] = this.props.subscription.status;
      schedule['startDate'] = this.props.subscription.startDate;
      schedule['duration'] = this.props.subscription.duration;
      schedule['frequency'] = this.props.subscription.frequency;
      schedule['startDate'] = this.props.subscription.startDate;
      recipient['firstName'] = this.props.subscription.recipientFirstName;
      recipient['lastName'] = this.props.subscription.recipientLastName;
      recipient['address'] = this.props.subscription.recipientAddress;
      recipient['aptSuite'] = this.props.subscription.recipientAptSuite;
      recipient['city'] = this.props.subscription.recipientCity;
      recipient['state'] = this.props.subscription.recipientState;
      recipient['zipcode'] = this.props.subscription.recipientZipcode;
      recipient['phone'] = this.props.subscription.recipientPhone;
      // console.log('order: ',  order);    
      // console.log('product: ',  product);    
      // console.log('schedule: ',  schedule); 
      // console.log('recipient: ',  recipient); 

      
      return (
        <div className="subscriptionBlock">
          <OrderBlock orderNum={this.props.order} order={order} />
        </div>
      );
    
  }
}
