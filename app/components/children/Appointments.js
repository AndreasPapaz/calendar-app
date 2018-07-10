import React, { Component } from 'react';
import dateFns from 'date-fns';

class Appointments extends Component {
  constructor(props) {
      super(props);
      this.state = {
        selectedDate: props.calendarDate
      };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selectedDate: nextProps.calendarDate });
  }

  submitAppointment() {
    let pickedDate = new Date(String(this.state.selectedDate));
    let formatDate = pickedDate.toISOString().split('T')[0]

    console.log(formatDate);
  }

  render(){
    return(
      <div>
        <h1>{ String(this.state.selectedDate) }</h1>
        <button onClick={this.submitAppointment.bind(this)}>HEY WE NEED AN APPOINTMENT</button>
      </div>
    );
  }
}

export default Appointments;
