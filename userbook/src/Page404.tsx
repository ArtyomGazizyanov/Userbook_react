import * as React from "react";
import {Component} from "react";
import {IndexLink} from "react-router";
import {TRANSLATION} from "./translation/ru";

export class Page404 extends Component<{}, {}>
{
	public render()
	{
		return (
			<div className="page_not_found">
				<span className="error_code">{TRANSLATION.PAGE404.ERROR_CODE}</span>
				<h1 className="header">{TRANSLATION.PAGE404.HEADER}</h1>
				<IndexLink to="/" className="back_to_main_page" href="">
					<span>{TRANSLATION.PAGE404.BACK_TO_MAIN_PAGE}</span>
				</IndexLink>
			</div>
		);
	}
}
