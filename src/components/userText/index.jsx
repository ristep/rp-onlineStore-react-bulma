import React from "react";
import { useUserTitles, useIsLoggedIn } from "redux/selectorHooks";

export const UserText = () => {
	const loginOK = useIsLoggedIn();
	const { userName, firstName, secondName } = useUserTitles();
	//console.log(loginOK);
	if(loginOK)
		return (
			<div className="userPanel" onClick={() => {window.location.href='/#/user'}}>
				{/* <div className="userImePrez" >{userName}</div> */}
				<div className="userImePrez" >{userName} - {firstName} {secondName}</div>
			</div>
		);
	else
			return(<></>)
}
