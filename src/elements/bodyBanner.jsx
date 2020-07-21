import React from 'react';
import styled from 'styled-components';

//import ReactJson from 'react-json-view';
import { useSelector } from "react-redux";
import { getColors } from 'redux/reducers/theme';

const Body = styled.div`
	height: fit-content;
	display: contents;
`;

const BodyBanner = (props) => {
	const color = useSelector(getColors);

	return(
		<Body style={{ backgroundColor: color.background} }>
			{props.children}
		</Body>
	)
	
}

export default BodyBanner;