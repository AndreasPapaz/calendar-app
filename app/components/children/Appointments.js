import React, { Component } from 'react';

class Appointments extends Component {
  constructor(props) {
      super(props);

  }

  componentWillMount() {
    console.log('1111111111111111');
    console.log('appointment compoinent');
    console.log(this.props);
    console.log('1111111111111111');
		this.state = {
			calendarDate: this.props
		}
	}

  render(){
    return(
      <div>APPOINTMENTS</div>
    );
  }
}

export default Appointments;
