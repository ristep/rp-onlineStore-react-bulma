import React from 'react';
import styled from 'styled-components';

import { useSelector } from "react-redux";
import { getColors } from 'redux/reducers/theme';

const TopBannerStyled = styled.div`
position: relative;
height: 60px;
line-height:40px;
text-align: center;
text-shadow: 20px;
font-size: 26px;
color: white;
border-top-left-radius: 6px;
border-top-right-radius: 6px;
box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.66);
`;

const TopBanner = (props) => {
	const color = useSelector(getColors);

	return(
		<TopBannerStyled style={{ backgroundColor: color.primary} }>
			{props.children}
		</TopBannerStyled>
	)
	
}

export default TopBanner;