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
      const { product, frequency, duration, gift, color, suspend, delivery } = subscription;

      return (<li key={index}>{product}, {frequency}, {duration}, {gift}, {color}, {suspend}, {delivery}</li>)
    });
    return subscriptionList;
  }
// let subscriptions = this.props.subscriptions.map((subscription, index) => (
//   <li key={index}>{subscription}</li>
// ));
  render() {
    console.log(this.renderResults());
    return (
      <ul>
          {this.renderResults()}
      </ul>
    );
  }
}

// SubscriptionList.propTypes = {
//   fetchData: PropTypes.func.isRequired,
//   subscriptions: PropTypes.array.isRequired,
//   hasErrored: PropTypes.bool.isRequired,
//   isLoading: PropTypes.bool.isRequired
// };

const mapStateToProps = state => ({
    subscriptions: state.subscriptions.subscriptions
    // hasErrored: state.subscriptionsHasErrored,
    // isLoading: state.subscriptionsIsLoading
});
export default connect(mapStateToProps)(SubscriptionList);