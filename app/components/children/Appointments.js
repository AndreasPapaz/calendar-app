import React, { Component } from 'react';

import axios from 'axios';
import dateFns from 'date-fns';

import AppointmentForm from './form/appointmentForm'
import { Card, Button, Input } from 'semantic-ui-react'

class Appointments extends Component {
  constructor(props) {
      super(props);
      this.state = {
        todayDate: new Date(),
        selectedDate: props.calendarDate,
        formatDate: null,
        editing: false,
        representDate: null,
        entry: {
          body: ''
        },
        appointmentDay: null
      };
      this.submitAppointment = this.submitAppointment.bind(this);
      this.deleteAppointment = this.deleteAppointment.bind(this);
		  this.changeEntry = this.changeEntry.bind(this);
      this.updateAppointment = this.updateAppointment.bind(this);
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

  updateAppointment(e){
    e.preventDefault();

    if (this.state.editing) {
      let updateData = {
        Date: this.state.formatDate,
        body: this.state.entry.body
      };

      axios.post('/update_appointment', updateData).then(res => {
        this.setState({
          editing: false
        });
      })
    }
    else {
      this.setState({
        editing: true
      });
    }
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

  isEditing() {
    if (this.state.editing){
      return(
        <Input
          name='body'
          onChange={this.changeEntry}
          value={ this.state.entry.body }
        />
      )
    } else {
      return(
        <Card.Description onClick={this.updateAppointment}>
          { this.state.appointmentDay }
        </Card.Description>
      )
    }
  }

  makeOrDelete() {
    let todayDate = new Date(this.state.todayDate);
    let selectedDate = new Date(this.state.selectedDate);

    if (this.state.appointmentDay !== null) {
      return(
        <Card>
          <Card.Content>
            <Card.Header>Appointment for... { this.state.representDate }</Card.Header>
            { this.isEditing() }
          </Card.Content>
          <Button onClick={ this.updateAppointment }>Update</Button>
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
