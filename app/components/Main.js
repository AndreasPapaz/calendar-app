import React, { Component } from 'react';

import Calendar from './children/Calendar';

export default class Main extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <div id='logo'></div>
          <span className='title-text'>
          <b>Wicked Calendar App, Made with React by: Andreas Papazafeiropoulos</b>
          </span>
        </header>
        <main>
          <Calendar />
        </main>
      </div>
    );
  }
}
