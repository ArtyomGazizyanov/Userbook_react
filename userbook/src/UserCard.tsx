import * as React from "react";
import {Component} from "react";
import {Link} from "react-router";
import * as Request from "request";
import {constant} from "./constant";
import "./css/userCard.css";
import {TRANSLATION} from "./translation/ru";
import {User} from "./User";

const phoneImg = "/" + require("./img/phone.png");
const mailImg = "/" + require("./img/mail.png");
const presentImg = "/" + require("./img/present.png");
const deleteImg = "/" + require("./img/delete.png");
const editImg = "/" + require("./img/edit.png");
const downloadImg = "/" + require("./img/download.png");

export class UserCard extends Component<any, any>
{
	public render()
	{
		const userComponents = this.props.users.map((user: User) => {
			return (
				<div className="card" key={user.id} id={`user_${user.id}`}>
					<div className="avatar">
						<img
							src= {`http://${constant.SERVER.NAME}:${constant.SERVER.PORT}/getPhoto/${user.image}`}
							className="user_photo"
							alt={user.image}
						/>
						<a
							href={`http://${constant.SERVER.NAME}:${constant.SERVER.PORT}/getPhoto/${user.image}`}
							className="download_button"
						>
							<img
								src= {downloadImg}
								className="service_img"
								alt={TRANSLATION.ALT.USER_LIST.DOWNLOAD}
							/>
							<span className="download_button_text">
								{TRANSLATION.MENU.GET_ORIGINAL_USER_PHOTO}
							</span>
						</a>
					</div>
					<div className="full_name">
						<span className="text allot">{user.lastName}</span>
						<span className="text name_text">{user.name}</span>
						<span className="text name_text">{user.middleName}</span>
					</div>
					<div className="contact_info">
						<div className="birthday">
							<img
								src={presentImg}
								className="contact_img cake"
								alt={TRANSLATION.USER_LIST.TABLE_HEAD.BIRTHDAY}
							/>
							<span className="information_text">{user.birthDate}</span>
						</div>
						<div className="contact_item">							
							<a
								href={constant.LINK_ACTION.TEL + user.phone}
								className = "phone_button"
							>
								<img
									src={phoneImg}
									className="contact_img phone"
									alt={TRANSLATION.USER_LIST.TABLE_HEAD.PHONE_NUMBER}
								/>
								<span className="information_text">{user.phone}</span>
							</a>							
						</div>
						<div className="contact_item">	
							<a
								href={constant.LINK_ACTION.MAILTO + user.email}
								className = "mailto_button"
							>						
								<img
									src={mailImg}
									className="contact_img email"
									alt={TRANSLATION.USER_LIST.TABLE_HEAD.EMAIL}
								/>			
								<span className="information_text">{user.email}</span>										
							</a>
						</div>
					</div>
					<div className="edit_bar">
						<div className="edit_tool">
							<Link to={"/users/edit?id=" + user.id}>
								<img
									src={editImg}
									className="edit_img"
									alt={TRANSLATION.ALT.USER_LIST.EDIT}
								/>
							</Link>
						</div>
						<div className="edit_tool"> 
							<img
								src={deleteImg}
								className="delete_img edit_img"
								alt={TRANSLATION.ALT.USER_LIST.REMOVE}
								onClick={onUserRemoveClick.bind(null, user.id)}
							/> 
						</div>
					</div>
				</div>
			);
		});
		return <div>{userComponents}</div>;
	}
}

function onUserRemoveClick(userId: number)
{
	function onUserRemoveError()
	{
		console.log("ERROR");
	}

	const cardElement: any = document.getElementById(`user_${userId}`);
	fetch(`http://${constant.SERVER.NAME}:${constant.SERVER.PORT}/delete/${userId}`, {
		method: "DELETE"
	}).then((response) => {
		if (response.status === constant.HTTP_STATUS_CODE.OK)
		{
			cardElement.classList.add("none");
		}
		else
		{
			onUserRemoveError();
		}
	}).catch(() => {
		onUserRemoveError();
	});
}
