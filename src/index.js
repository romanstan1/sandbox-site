import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import $ from 'jquery'

// ReactDOM.render(<App />, document.getElementById('root'));


$(document).ready(function () {
    ReactDOM.render(<App />, document.getElementById('root'));
});
