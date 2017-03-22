import * as moment from "moment";
import * as React from "react";
import * as DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as ReactDOM from "react-dom";
import {constant} from "./constant";
import {TRANSLATION} from "./translation/ru";

export const userAdd = React.createClass({
	render()
	{
		return (
			<div className="user_add">
				<h2 className="header_text">{TRANSLATION.USER_ADD.HEADER}</h2>
				<div className="form_msg" id="formMsg" />
				<form className="form" id="form">
					<div className="edit_column">
						<label
							className="row label_text"
							htmlFor="lastName"
						>
							{TRANSLATION.USER_ADD.FORM.LAST_NAME}
						</label>
						<input
							className="row"
							type="text"
							name="lastName"
							id="lastName"
							placeholder={TRANSLATION.USER_ADD.FORM.LAST_NAME}
						/>
						<label
							className="row label_text"
							htmlFor="name"
						>
							{TRANSLATION.USER_ADD.FORM.FIRST_NAME}
						</label>
						<input
							className="row"
							type="text"
							name="name"
							id="name"
							placeholder={TRANSLATION.USER_ADD.FORM.FIRST_NAME}
						/>
						<label
							className="row label_text"
							htmlFor="middleName"
						>
							{TRANSLATION.USER_ADD.FORM.MIDDLE_NAME}
						</label>
						<input
							className="row"
							type="text"
							name="middleName"
							id="middleName"
							placeholder={TRANSLATION.USER_ADD.FORM.MIDDLE_NAME}
						/>
					</div>
					<div className="edit_column">
						<div className="choose_date">
							<label className="row choose_date_label" htmlFor="birthday">{TRANSLATION.USER_ADD.FORM.BIRTHDAY}</label>
							<DatePicker
								className="row choose_date"
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
							{TRANSLATION.USER_ADD.FORM.EMAIL}
						</label>
						<input
							className="row"
							type="email"
							name="email"
							id="email"
							placeholder={TRANSLATION.USER_ADD.FORM.EMAIL}
						/>
						<label
							className="row label_text"
							htmlFor="phoneNumber"
						>
							{TRANSLATION.USER_ADD.FORM.PHONE_NUMBER}
						</label>
						<input
							className="row"
							type="text"
							name="phone"
							id="phoneNumber"
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
							{TRANSLATION.USER_ADD.FORM.PHOTO}
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
						value={TRANSLATION.USER_ADD.FORM.SUBMIT}
						onClick={onSubmitClick}
					/>
				</form>
			</div>
		);
	},

	getInitialState()
	{
		return {
			startDate: moment()
		};
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

	const lastNameELement: any = document.getElementById("lastName");
	const firstNameELement: any = document.getElementById("name");
	const middleNameELement: any = document.getElementById("middleName");
	const birthdayELement: any = document.getElementById("birthday");
	const emailELement: any = document.getElementById("email");
	const phoneNumberELement: any = document.getElementById("phoneNumber");
	const chooseFileElement: any = document.getElementById("photo");

	if (
		lastNameELement.value === "" ||
		firstNameELement.value === "" ||
		middleNameELement.value === "" ||
		birthdayELement.value === "" ||
		emailELement.value === "" ||
		phoneNumberELement.value === "" ||
		chooseFileElement.value === ""
	)
	{
		ReactDOM.render(
			<span>{TRANSLATION.USER_ADD.FORM_MSG.FILL_ALL_FIELDS}</span>,
			formMsg
		);
		formMsg.classList.add("error_msg");
		formMsg.style.display = "block";
		return;
	}
	formMsg.style.display = "none";
	formMsg.innerHTML = "";

	submitButton.disabled = true;

	ReactDOM.render(
		<span>{TRANSLATION.USER_ADD.FORM_MSG.PROCESSING}</span>,
		formMsg
	);
	formMsg.classList.add("processing");
	formMsg.style.display = "block";

	const formElement: any = document.getElementById("form");
	const form: any = new FormData(formElement);

	fetch(`http://${constant.SERVER.NAME}:${constant.SERVER.PORT}/insert`, {
		method: "POST",
		body: form
	}).then((response) => {
		if (response.status === constant.HTTP_STATUS_CODE.OK)
		{
			formMsg.classList.remove("processing");
			formMsg.classList.add("success");
			formMsg.innerHTML = "";
			ReactDOM.render(
				<span>{TRANSLATION.USER_ADD.FORM_MSG.SUCCESS}</span>,
				formMsg
			);
			lastNameELement.value = "";
			firstNameELement.value = "";
			middleNameELement.value = "";
			birthdayELement.value = "";
			emailELement.value = "";
			phoneNumberELement.value = "";
			chooseFileElement.value = "";

			const chooseFileLabelElement: any = document.getElementById("photoLabel");
			chooseFileLabelElement.innerHTML = TRANSLATION.USER_ADD.FORM.PHOTO;
			submitButton.disabled = false;
		}
		else
		{
			onUserAddError();
		}
	}).catch(() => {
		onUserAddError();
	});
}
