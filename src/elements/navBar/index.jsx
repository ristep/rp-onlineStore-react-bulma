import React from 'react';

import { useSelector } from "react-redux";
import { getColors } from 'redux/reducers/theme';

const NavBar = (props) => {
	const color = useSelector(getColors);

	return(
		<div className='navBar' style={{ backgroundColor: color.primary} }>
			{props.children}
		</div>
	)
	
}

export default NavBar;