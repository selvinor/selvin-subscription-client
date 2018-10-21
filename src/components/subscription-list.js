import  React from 'react';
import SubscriptionBlock from './subscription-block';

export class SubscriptionList extends React.Component {
  render() { 
    const subsList = [];
    console.log('this.props.subscriptions.length', this.props.subscriptions.length); 
    let i=0; 
    while (i < this.props.subscriptions.length) {
        // format subscription items
      subsList.push(
        <li key={i}>
          <SubscriptionBlock  subscription={this.props.subscriptions[i]}/> 
        </li>
      );  
      console.log('subsList.length: ', subsList.length); 
      i++;  
    }
    console.log('ready to return');    
    return (
      <ul>
        {subsList}
      </ul>      
    );
  }
} 

export default SubscriptionList;