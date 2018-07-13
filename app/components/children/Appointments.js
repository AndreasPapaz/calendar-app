import React, { Component } from 'react';

import axios from 'axios';
import dateFns from 'date-fns';

import AppointmentForm from './form/appointmentForm'
import { Card, Button } from 'semantic-ui-react'

class Appointments extends Component {
  constructor(props) {
      super(props);
      this.state = {
        todayDate: new Date(),
        selectedDate: props.calendarDate,
        formatDate: null,
        representDate: null,
        entry: {
          body: ''
        },
        appointmentDay: null
      };
      this.submitAppointment = this.submitAppointment.bind(this);
      this.deleteAppointment = this.deleteAppointment.bind(this);
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
        appointmentDay: res.data.body
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
        data = res.data.body
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

    axios.post('/appointment', mongoData).then(res => {
      this.setState({
        appointmentDay: res.data.body
      });
    });
  }

  deleteAppointment(e){
    e.preventDefault();

    let mongoData = {
      Date: this.state.formatDate
    };

    axios.post('/delete', mongoData).then(res => {
      this.setState({
        appointmentDay: null
      });
    });
  }

  makeOrDelete() {
    let todayDate = new Date(this.state.todayDate);
    let selectedDate = new Date(this.state.selectedDate);

    if (this.state.appointmentDay !== null) {
      return(
        <Card>
          <Card.Content>
            <Card.Header>Appointment for... { this.state.representDate }</Card.Header>
            <Card.Description>{ this.state.appointmentDay }</Card.Description>
          </Card.Content>
          <Button negative onClick={ this.deleteAppointment }>Delete</Button>
        </Card>
      )
    }
    else if (todayDate.toLocaleDateString() <= selectedDate.toLocaleDateString()){
      return(
        <AppointmentForm
          onSubmit={this.submitAppointment}
          onChange={this.changeEntry}
          entry={this.state.entry}
          selectedDate={this.state.representDate}
        />
      )
    }
  }

  render(){
    return(
      <div class='container'>
        { this.makeOrDelete() }
      </div>
    );
  }
}

export default Appointments;
