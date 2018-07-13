import React, { Component } from 'react';

import axios from 'axios';
import dateFns from 'date-fns';

import AppointmentForm from './form/appointmentForm'
import AppointmentBody from './form/appointmentBody';

class Appointments extends Component {
  constructor(props) {
      super(props);
      this.state = {
        selectedDate: props.calendarDate,
        formatDate: null,
        representDate: null,
        entry: {
          date: '',
          body: ''
        },
        appointmentDay: null
      };
      this.submitAppointment = this.submitAppointment.bind(this);
		  this.changeEntry = this.changeEntry.bind(this);
  }

  componentWillMount(){
    let pickedDate = new Date(String(this.props.calendarDate));
    let formatDate = pickedDate.toLocaleDateString();
    let repDate = String(pickedDate).split(pickedDate.getFullYear())[0];

    this.setState({
      formatDate: formatDate,
      representDate: repDate
    });

    let getData = {
      day: formatDate
    };

    axios.post('/get_appointment', getData).then(res => {
      this.setState({
        appointmentDay: res.body
      });
    });

  }

  componentWillReceiveProps(nextProps) {
    let pickedDate = new Date(String(nextProps.calendarDate));
    let formatDate = pickedDate.toLocaleDateString();
    let repDate = String(pickedDate).split(pickedDate.getFullYear())[0];

    this.setState({
      selectedDate: nextProps.calendarDate,
      representDate: repDate,
      formatDate: formatDate
    });

    let getData = {
      day: formatDate
    };

    axios.post('/get_appointment', getData).then(res => {
      let data = null;
      if (res.data !== null){
        data = res.body
      }
      this.setState({
        appointmentDay: data
      });
    });
  }

  changeEntry(event) {
    const entry = this.state.entry;
		const field = event.target.name;
		entry[field] = event.target.value;
		console.log(field);
		this.setState({
			entry
		});
	}

  submitAppointment(e) {
    e.preventDefault();
    let mongoData = {
      Date: this.state.formatDate,
      body: this.state.entry.body
    };

    axios.post('/appointment', mongoData);
  }

  makeOrDelete() {
    if (this.state.appointmentDay !== null) {
      return <h3>Not Null</h3>
    } else {
      return(
        <AppointmentForm
          onSubmit={this.submitAppointment}
          onChange={this.changeEntry}
          entry={this.state.entry}
        />
      )
    }
  }

  render(){
    return(
      <div>
        <h1>{ this.state.representDate }</h1>
        { this.makeOrDelete() }
      </div>
    );
  }
}

export default Appointments;
