import React from 'react';
import UserBlock from './user-block';
import OrderBlock from './order-block';

export default class SubscriptionBlock extends React.Component {

  render() {
    const user = {};
    const product = {};
    const schedule= {};
    const recipient = {};
    const order={};
    const orders=[{order, product, schedule, recipient}];
    
    console.log('subscriptionBlock - this.props.subscription:', this.props.subscription);

    console.log('this.props.subscription.length', this.props.subscription.length); 
      user.userId = this.props.subscription.userId;
      user.username = this.props.subscription.username;
      user.userFirstName = this.props.subscription.userFirstName;
      user.userLastName = this.props.subscription.userLastName;
      user.userEmail = this.props.subscription.userEmail;
      user.userPhone = this.props.subscription.userPhone;
      console.log('user: ', user); 
      console.log('this.props.subscription.orders.length', this.props.subscription.orders.length);    
      let y=0;    
      while( y < this.props.subscription.orders.length-1) {
        console.log(' y : ',y,  ' | this.props.subscription.orders.length', this.props.subscription.orders.length);   
        console.log('orders[y]: ', orders[y]);      
        orders[y].order['orderNum'] = this.props.subscription.orders[y].orderNum;
        orders[y].product['code'] = this.props.subscription.orders[y].productCode;
        orders[y].product['desc'] = this.props.subscription.orders[y].productDesc;
        orders[y].product['image'] = this.props.subscription.orders[y].productImage;
        orders[y].product['price'] = this.props.subscription.orders[y].productPrice;
        orders[y].schedule['frequency'] = this.props.subscription.orders[y].frequency;
        orders[y].schedule['duration'] = this.props.subscription.orders[y].duration;
        orders[y].schedule['deliveryDate'] = this.props.subscription.orders[y].deliveryDate;
        orders[y].recipient['name'] = this.props.subscription.orders[y].recipientName;
        orders[y].recipient['address'] = this.props.subscription.orders[y].recipientAddress;
        orders[y].recipient['aptSuite'] = this.props.subscription.orders[y].recipientAptSuite;
        orders[y].recipient['city'] = this.props.subscription.orders[y].recipientCity;
        orders[y].recipient['state'] = this.props.subscription.orders[y].recipientState;
        orders[y].recipient['zipcode'] = this.props.subscription.orders[y].recipientZipcode;
        orders[y].recipient['phone'] = this.props.subscription.orders[y].recipientPhone;
        console.log('orders[y].order: ',y,  orders[y].order);    
        console.log('orders[y].product: ',y,  orders[y].product);    
        console.log('orders[y].schedule: ',y,  orders[y].schedule); 
        console.log('orders[y].recipient: ',y,  orders[y].recipient); 

        y++;    
      }
      
      return (
        <div className="subscriptionBlock">
        <h2>SUBSCRIPTION</h2>
          <UserBlock user={user} />
          <OrderBlock orders={orders} />
        </div>
      );
    
  }
}
