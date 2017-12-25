import React from "react"
import {NavLink,Link } from 'react-router-dom'

const Footer = () => (
	<ul>
		<li>
			<NavLink activeClassName="active" to="/home">
				<i className="iconfont icon-shiliangzhinengduixiang2"></i>
				<p>首页</p>
			</NavLink>
		</li>
		<li>
			<NavLink activeClassName="active" to="/kind">
				<i className="iconfont icon-jian"></i>
				<p>分类</p>
			</NavLink>
		</li>
		<li>
			<NavLink activeClassName="active" to="/cart">
				<i className="iconfont icon-gun1197824easyiconnet"></i>
				<p>购物车</p>
			</NavLink>
		</li>
		<li>
			<NavLink activeClassName="active" to="/user">
				<i className="iconfont icon-daojianfu"></i>
				<p>我的</p>
			</NavLink>
		</li>
	</ul>
)

export default Footer;