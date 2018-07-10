import React, { Component } from 'react';
import dateFns from 'date-fns';

import AppointmentForm from './form/appointmentForm'

class Appointments extends Component {
  constructor(props) {
      super(props);
      this.state = {
        selectedDate: props.calendarDate,
        formatDate: null
      };
  }

  componentWillReceiveProps(nextProps) {
    let pickedDate = new Date(String(this.state.selectedDate));
    let formatDate = pickedDate.toISOString().split('T')[0]
    this.setState({
      selectedDate: nextProps.calendarDate,
      formatDate: formatDate
    });
  }

  submitAppointment() {
    let pickedDate = new Date(String(this.state.selectedDate));
    let formatDate = pickedDate.toISOString().split('T')[0]

    // this.setState({
    //   this.
    // })
    console.log(formatDate);
  }

  render(){
    return(
      <div>
        <h1>{ String(this.state.selectedDate) }</h1>
        <button onClick={this.submitAppointment.bind(this)}>HEY WE NEED AN APPOINTMENT</button>
          <AppointmentForm
    				onSubmit={this.processForm}
    				entry={this.state.formatDate}
  				/>
      </div>
    );
  }
}

export default Appointments;
