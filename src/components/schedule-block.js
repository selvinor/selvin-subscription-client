import React from 'react';
export default class ScheduleBlock extends React.Component {
  render() {
    return (
      <div className="scheduleBlock">
      <h5>SCHEDULE</h5>
        <p><span className="title">Frequency: </span>{this.props.schedule.frequency}</p>
        <p><span className="title">Duration: </span>{this.props.schedule.duration}</p>
        <p><span className="title">Delivery Date: </span>{this.props.schedule.deliveryDate}</p>
      </div>
    );
  }
}
