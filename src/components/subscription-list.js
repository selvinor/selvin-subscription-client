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
      const {productCode, productName, frequency, duration, startDate, senderEmail, 
        senderFirstName, senderLastName, senderPhone, recipientFirstName, recipientLastName, 
        recipientCompany, recipientStreetAddress, recipientAptSuite, recipientCity, 
        recipientState, recipientZipcode, recipientPhone, recipientMessage} = subscription;

      return (<li key={index}> {productCode}, 
      {productName}, {frequency}, {duration}, {startDate}, {senderEmail}, 
      {senderFirstName}, {senderEmail}, {senderFirstName}, {senderLastName}, 
      {senderPhone},  {recipientFirstName}, {recipientLastName}, {recipientCompany}, 
      {recipientStreetAddress}, {recipientAptSuite}, {recipientCity}, {recipientState}, {recipientZipcode}, 
      {senderFirstName}, {senderEmail}, {senderFirstName}, {senderLastName}, 
      {recipientPhone},  {recipientMessage}</li>)
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