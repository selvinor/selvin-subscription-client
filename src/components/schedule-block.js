import React from 'react';
//import './styles/schedule-block.css';

export default class ScheduleBlock extends React.Component {
  render() {
    console.log('this.props.schedule.startDate: ', this.props.schedule.startDate)
    let startMM = this.props.schedule.startDate.slice(4,6);
    let startDD = this.props.schedule.startDate.slice(6,8);
    let startYYYY = this.props.schedule.startDate.slice(0,4);
    return (
      <div className="scheduleBlock">
        <h5 className="scheduleTitle">SCHEDULE</h5>
        <ul>
          <li><span className="title">Frequency: </span>{this.props.schedule.frequency}</li>
          <li><span className="title">Duration: </span>{this.props.schedule.duration}</li>
          <li><span className="title">Start Date: </span>{startMM}/{startDD}/{startYYYY}</li>
        </ul>
      </div>
    );
  }
}
