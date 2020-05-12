import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
var redux = require('redux');

import $ from 'jquery/dist/jquery';
import 'bootstrap/dist/js/bootstrap';

import Main from "Main";

var appLanguage = (state = null, action) => {
   if (action.lang) {
      return action.lang;
   } else if (state == null) {
      return 'en';
   }
   return state;
}

// const displayText = require('./util/displayText');

var reducer = redux.combineReducers({ appLanguage });
var store = redux.createStore(reducer);

ReactDOM.render(
   <Provider store={store}>
      <Main ></Main>
   </Provider>
   , document.getElementById('main'));

$(document).on('click', 'input:checkbox+label, input:radio+label', function () {
   $(this).prev('input').prop('checked', !$(this).prev('input').prop('checked'));
})