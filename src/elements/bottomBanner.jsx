import React from 'react';
import styled from 'styled-components';

//import ReactJson from 'react-json-view';
import { useSelector } from "react-redux";
import { getColors } from 'redux/reducers/theme';

const BottomBannerStyled = styled.div`
	border-top-left-radius: 0px;
	border-top-right-radius: 0px;
	border-bottom-left-radius: 6px;
	border-bottom-right-radius: 6px;
	line-height:40px;
	text-align: center;
	text-shadow: 20px;
	width:100%;
  height:42px;
  background-color:#94A74D;
  position:absolute;
	bottom:0px;
	box-shadow: 0px -1px 3px -1px rgba(0,0,0,0.66);
	`;

const BottomBanner = (props) => {
	const color = useSelector(getColors);

	return (
	<div>
		<BottomBannerStyled style={{ backgroundColor: color.primary }}>
			{props.children}
		</BottomBannerStyled>
	</div>
	)

}

export default BottomBanner;