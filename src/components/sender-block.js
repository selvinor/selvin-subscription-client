import React from 'react';
export default class SenderBlock extends React.Component {
  render() {
    return (
      <div className="senderBlock">
        
        <ul>
          <li><h2>SENDER</h2></li>
          <li>
            <span className="title">Name: </span>{this.props.user.userFirstName} {this.props.user.userLastName}
          </li>
          <li>
            <span className="title">Email: </span>{this.props.user.userEmail}
          </li>
          <li>
            <span className="title">Phone: </span>{this.props.user.userPhone}
          </li>
        </ul>
      </div>
    );
  }
}
