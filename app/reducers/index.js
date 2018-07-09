import { combineReducers } from 'redux';
import calendarReducer from './reducer_calendar';

const rootReducer = combineReducers({
  calendar: calendarReducer
});

export default rootReducer;
