import React, { Component } from 'react';

import axios from 'axios';
import dateFns from 'date-fns';

import AppointmentForm from './form/appointmentForm'

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
        }
      };
      this.submitAppointment = this.submitAppointment.bind(this);
		  this.changeEntry = this.changeEntry.bind(this);
  }

  componentWillMount(){
    let pickedDate = new Date(String(this.props.calendarDate));
    let repDate = String(pickedDate).split(pickedDate.getFullYear())[0];

    this.setState({
      representDate: repDate
    });
  }

  componentWillReceiveProps(nextProps) {
    // let pickedDate = new Date(String(this.state.selectedDate));
    let pickedDate = new Date(String(nextProps.calendarDate));
    let formatDate = pickedDate.toISOString().split('T')[0];
    let repDate = String(pickedDate).split(pickedDate.getFullYear())[0];

    this.setState({
      selectedDate: nextProps.calendarDate,
      representDate: repDate,
      formatDate: formatDate
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
      date: this.state.formatDate,
      body: this.state.entry.body
    };

    axios.post('/test', mongoData);
  }

  render(){
    return(
      <div>
        <h1>{ this.state.representDate }</h1>
          <AppointmentForm
    				onSubmit={this.submitAppointment}
            onChange={this.changeEntry}
    				entry={this.state.entry}
  				/>
      </div>
    );
  }
}

// Appointments.PropTypes = {
//     children: PropTypes.object.isRequired
// };

export default Appointments;
