import React from 'react';
import OrderBlock from './order-block';

export default class SubscriptionBlock extends React.Component {

  render() {
    const user = {};
    const product = {};
    const schedule= {};
    const recipient = {};
    const order={product, schedule, recipient};
    
    console.log('subscriptionBlock - this.props.subscription:', this.props.subscription);

      user.userId = this.props.subscription.userId;
      user.username = this.props.subscription.username;
      user.userFirstName = this.props.subscription.userFirstName;
      user.userLastName = this.props.subscription.userLastName;
      user.userEmail = this.props.subscription.userEmail;
      user.userPhone = this.props.subscription.userPhone;
      console.log('user: ', user); 
     
      product['code'] = this.props.subscription.productCode;
      product['desc'] = this.props.subscription.productDesc;
      product['image'] = this.props.subscription.productImage;
      product['price'] = this.props.subscription.productPrice;
      schedule['frequency'] = this.props.subscription.frequency;
      schedule['duration'] = this.props.subscription.duration;
      schedule['deliveryDate'] = this.props.subscription.deliveryDate;
      recipient['name'] = this.props.subscription.recipientName;
      recipient['address'] = this.props.subscription.recipientAddress;
      recipient['aptSuite'] = this.props.subscription.recipientAptSuite;
      recipient['city'] = this.props.subscription.recipientCity;
      recipient['state'] = this.props.subscription.recipientState;
      recipient['zipcode'] = this.props.subscription.recipientZipcode;
      recipient['phone'] = this.props.subscription.recipientPhone;
      console.log('order: ',  order);    
      console.log('product: ',  product);    
      console.log('schedule: ',  schedule); 
      console.log('recipient: ',  recipient); 

      
      return (
        <div className="subscriptionBlock">
        <h2>SUBSCRIPTION</h2>
          <OrderBlock orders={order} />
        </div>
      );
    
  }
}
