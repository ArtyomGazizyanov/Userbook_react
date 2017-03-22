import * as moment from "moment";
import * as React from "react";
import * as DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as ReactDOM from "react-dom";
import {IndexLink, Link} from "react-router";
import * as Request from "request";
import {constant} from "./constant";
import "./css/userEdit.css";
import {TRANSLATION} from "./translation/ru";
import {User} from "./User";

let user: any;
let idUser: number;

export const userEdit = React.createClass({
	getInitialState()
	{
		return {
			response: undefined,
			error: false
		};
	},
	componentWillMount()
	{
		this.setState({response: undefined,
			error: true
		});
		const that = this;
		idUser =  this.props.location.query.id;

		Request(`http://${constant.SERVER.NAME}:${constant.SERVER.PORT}/users/${idUser}`, (error, response, body) =>
		{
			if (error || !response || response.statusCode !== constant.HTTP_STATUS_CODE.OK)
			{
				console.log("error:", error);
				console.log("statusCode:", response && response.statusCode);
			}
			user = JSON.parse(body);
			that.setState({
				response: user,
				error: false,
				startDate: moment(user.birthDate, constant.DATE.FORMAT)
			});
		});
	},
	render()
	{
		idUser =  this.props.location.query.id;
		if (!this.state.response && !user || this.state.error) {
			if (this.state.error)
			{
				return <span className="loading error">{TRANSLATION.USER_LIST.ERROR}</span>;
			}
			else
			{
				return <span className="loading waiting">{TRANSLATION.USER_LIST.WAITING}</span>;
			}
		}
		if (this.state.response === 0) {
			return <span className="loading empty">{TRANSLATION.USER_LIST.EMPTY}</span>;
		}
		return (
			<div className="user_add">
				<h2 className="header_text">{TRANSLATION.EDIT_USER.HEADER}</h2>
				<div className="form_msg" id="formMsg" />
				<form className="form" id="form">
					<div className="edit_column">
						<label
							className="row label_text"
							htmlFor="lastName"
						>
							{TRANSLATION.EDIT_USER.FORM.LAST_NAME}
						</label>
						<input
							className="row"
							type="text"
							name="lastName"
							id="lastName"
							value={this.state.response.lastName}
							onChange={this.handleChange}
							placeholder={TRANSLATION.USER_ADD.FORM.LAST_NAME}
						/>
						<label
							className="row label_text"
							htmlFor="name"
						>
							{TRANSLATION.EDIT_USER.FORM.FIRST_NAME}
						</label>
						<input
							className="row"
							type="text"
							name="name"
							id="name"
							value={this.state.response.name}
							onChange={this.handleChange}
							placeholder={TRANSLATION.USER_ADD.FORM.FIRST_NAME}
						/>
						<label
							className="row label_text"
							htmlFor="middleName"
						>
							{TRANSLATION.EDIT_USER.FORM.MIDDLE_NAME}
						</label>
						<input
							className="row"
							type="text"
							name="middleName"
							id="middleName"
							value={this.state.response.middleName}
							onChange={this.handleChange}
							placeholder={TRANSLATION.USER_ADD.FORM.MIDDLE_NAME}
						/>
					</div>
					<div className="edit_column">
						<label
							className="row label_text"
							htmlFor="birthday"
						>
							{TRANSLATION.EDIT_USER.FORM.BIRTHDAY}
						</label>
						<div className="choose_date">
							<DatePicker
								dateFormat="DD.MM.YYYY"
								name="birthDate"
								id="birthday"
								selected={this.state.startDate}
								onChange={this.onDatePickerChange}
							/>
						</div>
						<label
							className="row label_text"
							htmlFor="email"
						>
							{TRANSLATION.EDIT_USER.FORM.EMAIL}
						</label>
						<input
							className="row"
							type="email"
							name="email"
							id="email"
							value={this.state.response.email}
							onChange={this.handleChange}
							placeholder={TRANSLATION.USER_ADD.FORM.EMAIL}
						/>
						<label
							className="row label_text"
							htmlFor="phoneNumber"
						>
							{TRANSLATION.EDIT_USER.FORM.PHONE_NUMBER}
						</label>
						<input
							className="row"
							type="text"
							name="phone"
							id="phoneNumber"
							value={this.state.response.phone}
							onChange={this.handleChange}
							placeholder={TRANSLATION.USER_ADD.FORM.PHONE_NUMBER}
						/>
					</div>
					<div className="edit_column">
						<label
							className="row choose_file_label"
							htmlFor="photo"
							id="photoLabel"
							tabIndex={0}
						>
							{TRANSLATION.EDIT_USER.FORM.PHOTO}
						</label>
						<input
							className="row choose_file"
							type="file"
							name="image"
							id="photo"
							onChange={onChooseFileChange.bind(this)}
						/>
					</div>
						<input
							className="submit"
							type="button"
							value={TRANSLATION.EDIT_USER.FORM.SUBMIT}
							onClick={onSubmitClick}
						/>
				</form>
			</div>
		);
	},
	componentDidMount()
	{
		this.setState({
			response: undefined,
			error: true
		});
		const that = this;
		idUser =  this.props.location.query.id;
		Request(`http://${constant.SERVER.NAME}:${constant.SERVER.PORT}/users/${idUser}`, (error, response, body) =>
		{
			if (error || !response || response.statusCode !== constant.HTTP_STATUS_CODE.OK)
			{
				console.log("error:", error);
				console.log("statusCode:", response && response.statusCode);
			}
			user = JSON.parse(body);
			that.setState({
				response: user,
				error: false,
				startDate: moment(user.birthDate, constant.DATE.FORMAT)
			});
		});
	},
	handleChange(event: any)
	{
		const target = event.target;
		user[target.name] = target.value;
		this.setState({response: user});
	},
	onDatePickerChange(date: any)
	{
		this.setState({
			startDate: date
		});
	}
});

function onChooseFileChange(event: any)
{
	event.preventDefault();
	const chooseFileElement = event.target;
	const chooseFileLabelElement = document.getElementById("photo");
	chooseFileLabelElement.innerHTML = chooseFileElement.files[0].name;
}

function onSubmitClick(event: any)
{
	const formMsg = document.getElementById("formMsg");
	formMsg.classList.remove("error_msg");
	formMsg.classList.remove("processing");
	formMsg.classList.remove("success");

	const submitButton = event.target;

	function onUserAddError()
	{
		formMsg.classList.remove("processing");
		formMsg.classList.add("error_msg");
		formMsg.innerHTML = "";
		ReactDOM.render(
			<span>{TRANSLATION.USER_ADD.FORM_MSG.FAILED}</span>,
			formMsg
		);
		submitButton.disabled = false;
	}

	function isInvalidalidFormData()
	{
		const lastNameELement: any = document.getElementById("lastName");
		const firstNameELement: any = document.getElementById("name");
		const middleNameELement: any = document.getElementById("middleName");
		const birthdayELement: any = document.getElementById("birthday");
		const emailELement: any = document.getElementById("email");
		const phoneNumberELement: any = document.getElementById("phoneNumber");
		const chooseFileElement: any = document.getElementById("photo");

		return(
			lastNameELement.value === "" ||
			firstNameELement.value === "" ||
			middleNameELement.value === "" ||
			birthdayELement.value === "" ||
			emailELement.value === "" ||
			phoneNumberELement.value === ""
		);
	}

	if (isInvalidalidFormData())
	{
		ReactDOM.render(
			<span>{TRANSLATION.USER_ADD.FORM_MSG.FILL_ALL_FIELDS}</span>,
			formMsg
		);
		formMsg.classList.add("error_msg");
		formMsg.style.display = "block";
		return;
	}

	function setMessege(msg: HTMLElement)
	{
		msg.style.display = "none";
		msg.innerHTML = "";

		ReactDOM.render(
			<span>{TRANSLATION.USER_ADD.FORM_MSG.PROCESSING}</span>,
			formMsg
		);
		formMsg.classList.add("processing");
		formMsg.style.display = "block";
	}

	setMessege(formMsg);

	const formElement: any = document.getElementById("form");
	const form: FormData = new FormData(formElement);
	fetch(`http://${constant.SERVER.NAME}:${constant.SERVER.PORT}/change/${user.id}`, {
		method: "PUT",
		body: form
	}).then((response) => {
		if (response.status === constant.HTTP_STATUS_CODE.OK)
		{
			formMsg.classList.remove("processing");
			formMsg.classList.add("success");
			formMsg.innerHTML = "";
			ReactDOM.render(
				(
				<div className="message">
					<span className="text">{TRANSLATION.USER_ADD.FORM_MSG.SUCCESS}</span> 
				</div>
				),
				formMsg
			);
			formElement.style.display = "none";
		}
		else
		{
			onUserAddError();
		}
	}).catch(() => {
		onUserAddError();
	});
}
