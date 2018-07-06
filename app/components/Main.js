import React, { Component } from 'react';

import Calendar from './children/Calendar';
import Appointments from './children/Appointments';

import './styles/App.css';

class Main extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <div id='logo'></div>
          <span className='icon'>date_range</span>
          <span>
            react<b>Calendar</b>
          </span>
        </header>
        <main>
          <Calendar />
        </main>
          <Appointments />
      </div>
    );
  }
}

export default Main;
