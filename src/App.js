import React, { Component } from 'react';
import logo from './logo.svg';
import {Route, Switch, Redirect} from 'react-router-dom';

import Footer from "./components/Footer.jsx"

import Home from "./components/Home.jsx"
import HomeHeader from "./components/HomeHeader.jsx"
import Kind from "./components/Kind.jsx"
import KindHeader from "./components/KindHeader.jsx"
import Cart from "./components/Cart.jsx"
import CartHeader from "./components/CartHeader.jsx"
import User from "./components/User.jsx"
import UserHeader from "./components/UserHeader.jsx"

class App extends Component {
	constructor(props){
		super(props)
	}
  render() {
    return (
		<div className="container">
			<header id="header">
				<Switch>
					<Route path="/home" component = {HomeHeader}/>
					<Route path="/kind" component = {KindHeader}/>
					<Route path="/cart" component = {CartHeader}/>
					<Route path="/user" component = {UserHeader}/>
					<Redirect from="*" to="/home"/>
				</Switch>
			</header>
			<div id="content">
				<Switch>
					<Route path="/home" component = {Home}/>
					<Route path="/kind" component = {Kind}/>
					<Route path="/cart" component = {Cart}/>
					<Route path="/user" component = {User}/>
					<Redirect from="*" to="/home"/>
				</Switch>
			</div>
			<footer id="footer">
				<Footer/>
			</footer>
		</div>
    );
  }
}

export default App;
