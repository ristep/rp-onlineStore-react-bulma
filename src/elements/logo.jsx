import React from 'react';
import logo from "../images/logo.svg";
 
const Logo = () => {
	
	return (
		<div className="image is-48x48">
			<img  src={logo} alt="logo" onClick={() => window.open("https://pan.sman.cloud")} />
		</div>
	);
} 

export default Logo;

// manual styling
// style={styles}
// let styles = {
// 	width: '42px',
// 	height: '32px',
// };
