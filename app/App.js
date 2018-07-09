import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { ReduxPromise } from 'redux-promise';

import Main from './components/Main';
// import reducers from './recuders';

// const createStoreMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(<Main />, document.getElementById('root'));
// ReactDom.render(
//   <Provider store={createStoreMiddleware(reducers)}>
//     <Main />
//   </Provider>
// , document.getElementById('root'));
