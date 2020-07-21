//import { combineReducers } from "redux"; // this is neddet if work without configureStore
 
import uiState from "./uiState";
import theme from "./theme";
import userToken from "./userToken";
import jsonData from "./jsonData";
import cartList from "./cartList";
import naviGator from "./naviGator";

export default { 
	naviGator,
	uiState,
	theme,
	userToken,
	jsonData,
	cartList
 };
