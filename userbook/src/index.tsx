import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRouter from "react-router";
import {browserHistory, IndexRoute, Route, Router} from "react-router";
import {app} from "./App";
import {Page404} from "./Page404";
import {TRANSLATION} from "./translation/ru";
import {userAdd} from "./UserAdd";
import {userEdit} from "./UserEdit";
import {userList} from "./UserList";

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={app}>
			<IndexRoute component={userList} />
			<Route path="users/list" component={userList} />
			<Route path="users/add" component={userAdd} />
			<Route path="users/edit" component={userEdit} />
		</Route>
		<Route path="*" component={Page404} />
	</Router>,
	document.getElementById("root")
);
