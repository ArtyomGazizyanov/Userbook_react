import * as React from "react";
import * as Request from "request";
import {constant} from "./constant";
import {TRANSLATION} from "./translation/ru";
import {User} from "./User";
import {UserCard} from "./UserCard";

let userArray: User[] = [];

export const userList = React.createClass({
	render()
	{
		if (!this.state.response) {
			if (this.state.error)
			{
				return <span className="loading error">{TRANSLATION.USER_LIST.ERROR}</span>;
			}
			else
			{
				return <span className="loading waiting">{TRANSLATION.USER_LIST.WAITING}</span>;
			}
		}
		if (this.state.response.length === 0) {
			return <span className="loading empty">{TRANSLATION.USER_LIST.EMPTY}</span>;
		}
		return (
			<div id="userList" className="user_list">
				<UserCard users={userArray} />
			</div>
		);
	},
	getInitialState()
	{
		return { response: undefined, error: false };
	},
	componentDidMount()
	{
		const that: any = this;
		Request(`http://${constant.SERVER.NAME}:${constant.SERVER.PORT}/users`, (error, response, body) =>
		{
			if (error || !response || response.statusCode !== constant.HTTP_STATUS_CODE.OK)
			{
				console.log("error:", error);
				console.log("statusCode:", response && response.statusCode);
				that.setState({response: undefined, error: true});
			}
			userArray = JSON.parse(body);
			this.setState({response: userArray, error: false});
		});
	}
});
