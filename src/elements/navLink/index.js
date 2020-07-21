import React from 'react';
import Icon from '@mdi/react'

const NavLink = (props) => {
	const onClickHand = () => {
		window.location.href = "#/"+props.navRoute;
	}

	return(
		<div className='navLink' onClick={onClickHand} {...props} >
			<Icon path={props.path}/>
			<label className="navLabel">{props.label}</label>
		</div>
	);
}

export default NavLink;