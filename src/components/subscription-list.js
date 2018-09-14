import  React from 'react';
import { connect } from 'react-redux';
import { fetchSubscriptions } from '../actions';
//import './subscriptions.css';
export class SubscriptionList extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchSubscriptions());
  }

  renderResults() {
    console.log('this.props.subscriptions', this.props.subscriptions);
    const subscriptionList = this.props.subscriptions.map((subscription, index) => {
      const { buyerEmail, buyerFirstName, buyerLastName, buyerPhone, productCode, productName, productColor, productSize, frequency, duration, gift, giftMsg, color, suspended, delivery } = subscription;

      return (<li key={index}> {buyerEmail}, {buyerFirstName}, {buyerLastName}, {buyerPhone},  {productCode}, {productName}, {productColor}, {productSize}, {frequency}, {duration}, {gift}, {giftMsg}, {color}, {suspended}, {delivery}</li>)
    });
    return subscriptionList;
  }

  render() {
    console.log(this.renderResults());
    return (
      <ul>
          {this.renderResults()}
      </ul>
    );
  }
}
 
const mapStateToProps = state => ({
    subscriptions: state.subscriptions.subscriptions
    // hasErrored: state.subscriptionsHasErrored,
    // isLoading: state.subscriptionsIsLoading
});
export default connect(mapStateToProps)(SubscriptionList);