import React from 'react';
export default class SchedluleBlock extends React.Component {
  render() {

    return (
      
      <ul className="recipientBlock">
        <li><h5>RECIPIENT</h5></li>
        <li><span className="title">Name: </span>{this.props.recipient.name}</li>
        <li><span className="title">Company: </span>{this.props.recipient.company}</li>
        <li><span className="title">Address: </span>{this.props.recipient.address}</li>
        <li><span className="title">Apt/Suite: </span>{this.props.recipient.aptSuite}</li>
        <li><span className="title">City: </span>{this.props.recipient.city}</li>
        <li><span className="title">State: </span>{this.props.recipient.state}</li>
        <li><span className="title">Zipcode: </span>{this.props.recipient.zipcode}</li>
        <li><span className="title">Message: </span>{this.props.recipient.message}</li>
      </ul>
    );
  }
}
