import * as React from "react";
import {Component} from "react";
import {IndexLink, Link} from "react-router";
import "./css/app.css";
import {TRANSLATION} from "./translation/ru";
const logo = require("./img/logo.png");

export class app extends Component<{}, {}>
{
	public render()
	{
		return (
			<div className="app">
				<div className="header">
					<IndexLink to="/" className="logo" href="">
						<img src={logo} className="logo-image" alt={TRANSLATION.ALT.LOGO}/>
						<h1 className="text">{TRANSLATION.PAGE_HEADER}</h1>
					</IndexLink>
					<ul className="menu">
						<li className="item"><Link className="link" to="/users/list" >{TRANSLATION.MENU.GET_USERS}</Link></li>
						<li className="item"><Link className="link" to="/users/add" >{TRANSLATION.MENU.ADD_USER}</Link></li>
					</ul>
				</div>
				<div className="content" id="content">
					{this.props.children}
				</div>
			</div>
		);
	}
}
