import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss';
import "./detail.scss";
import "./cart.scss";
import {HashRouter as Router,Route,Switch} from "react-router-dom";

import App from './App';
import Detail from './Detail.js'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    	<Switch>
				<Route component = {Detail} path="/detail"/>
     		<Route component = {App} path = "/"/>
    	</Switch>
  </Router>, document.getElementById('root'));
  
  
registerServiceWorker();
