import React from 'react';
//import './styles/recipient-block.css';

export default class SchedluleBlock extends React.Component {
  render() {

    return (
      <div className="recipientBlock">
        <h5 className="recipientTitle">RECIPIENT</h5>
        <ul>
          <li>{this.props.recipient.firstName} {this.props.recipient.lastName}</li>
          <li>{this.props.recipient.company ? !null : ""}</li>
          <li>{this.props.recipient.address} {this.props.recipient.aptSuite ? !null : ""}</li>
          <li>
            {this.props.recipient.city},  {this.props.recipient.state} {this.props.recipient.zipcode}
          </li>
          <li><span className="title">Message: </span>{this.props.recipient.message}</li>
        </ul>
      </div>
    );
  }
}
