import React from 'react';
import styled from 'styled-components';

//import ReactJson from 'react-json-view';
import { useSelector } from "react-redux";
import { getButtonColors } from 'redux/reducers/theme';

const ButtonS = styled.button`
  border: none;
  color: white;
  padding: 8px 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  /* font-size: 16px; */
  margin: 4px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
	transition-duration: 0.4s;
	border-radius:4px;
	box-shadow: 0 1px 2px 0 rgba(0,0,0,0.24),0 2px 5px 0 rgba(0,0,0,0.19);
	:hover{ 
		box-shadow: 0 2px 6px 0 rgba(0,0,0,0.24),0 7px 15px 0 rgba(0,0,0,0.19);
	}	
	:focus{
		outline: none;	
	}
`;

const Button = (props) => {
	const { green, blue, red } = useSelector(getButtonColors);
	var stl = { backgroundColor: green };
	
	if(props.blue){
	 	stl.backgroundColor= blue;
	};	
	if(props.red){
	  stl.backgroundColor = red;
	}; 

	if(props.disabled){
		 stl = { ...stl, backgroundColor:'#fff', color:'#c0c0c0', boxShadow: " 0 0 0 0" }; 
	}

	return(	
		<ButtonS style={stl} {...props} >
			{props.children}
		</ButtonS>
	)
}

export default Button;