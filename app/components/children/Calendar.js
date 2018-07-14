import React, { Component } from 'react';
import dateFns from 'date-fns';
import axios from 'axios';

import Appointments from './Appointments.js';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'


class Calendar extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      queryList: null
    };

    this.onDateClick = this.onDateClick.bind(this);
  }

  componentDidUpdate(){
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = 'D';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    let datesToSearch = {
      start: monthStart,
      end: monthEnd
    };

    axios.post('/calendar_fill', datesToSearch).then(res =>{
      const queryList = res.data;
      queryList.forEach((part, index, array) => {
        array[index] = part.Date.split('T')[0];
      });
      this.setState({
        queryList
      });
    });
  }

  componentWillMount() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = 'D';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    let datesToSearch = {
      start: monthStart,
      end: monthEnd
    };

    axios.post('/calendar_fill', datesToSearch).then(res =>{
      const queryList = res.data;
      queryList.forEach((part, index, array) => {
        array[index] = part.Date.split('T')[0];
      });
      this.setState({
        queryList
      });
    });
  }

  renderHeader() {
    const dateFormat = 'MMMM YYYY';

    return (
      <div className='header row flex-middle'>
        <div className='col col-start'>
          <div className='icon' onClick={this.prevMonth}>
            <i class="fas fa-chevron-left"></i>
          </div>
        </div>
        <div className='col col-center'>
          <span>
            {dateFns.format(this.state.currentMonth, dateFormat)}
          </span>
        </div>
        <div className='col col-end'>
          <div className='icon' onClick={this.nextMonth}>
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = 'dddd';
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className='col col-center' key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className='days row'>{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = 'D';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    let datesToSearch = {
      start: monthStart,
      end: monthEnd
    };

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);

        let dayCheck = new Date(day);
        let dayCheckFormat = dayCheck.toISOString().split('T')[0];
        let marker = (this.state.queryList.includes(dayCheckFormat) ? 'mark' : '');
        const cloneDay = day;

        days.push(
          <div className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
              ? 'disabled'
              : dateFns.isSameDay(day, selectedDate) ? 'selected': ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className='number'>{formattedDate}</span>
            <span className='bg'>{formattedDate}</span>
            <span className={`${marker}`}></span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className='body'>{rows}</div>;
  }

  onDateClick(day){
    this.setState({
      selectedDate: day
    });
  }

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {

    if (this.state.queryList === null){
      return (
        <Segment>
          <Dimmer active>
            <Loader />
          </Dimmer>
        </Segment>
      )
    }

    return (
      <div>
        <div className='calendar'>
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}
        </div>
        <Appointments calendarDate={this.state.selectedDate} />
      </div>
    );
  }
}

export default Calendar;
