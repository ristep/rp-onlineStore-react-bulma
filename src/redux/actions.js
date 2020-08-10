import {
	GO_HOME,
	CLOSE_SETTINGS_DIALOG,
	OPEN_SETTINGS_DIALOG,
	CLOSE_ABOUT_DIALOG,
	OPEN_ABOUT_DIALOG,
	OPEN_CLEAR_ALERT,
	CLOSE_CLEAR_ALERT,
	FETCH_TOKEN_SUCCESS,
	FETCH_TOKEN_ERROR,
	FETCH_TOKEN_REQUEST,
	ADD_TO_CART,
	REMOVE_FROM_CART,
	CLEAR_CART,
	OPEN_CART_BOX,
	CLOSE_CART_BOX,
	TOGGLE_CART_BOX,
	ADD_CART_ITEM_QUANTITY,
	NAVIGATE_TO_URL,
	UPDATE_DATA_FIELD,
	CANCEL_UPDATES,
	SUBMIT_REQUEST,
	SUBMIT_REQUEST_SUCCESS,
	SUBMIT_REQUEST_ERROR,
	RELOAD_DATA,
	PREPARE_DATA_ACTION,
	TOGGLE_SIDENAV,
	UPDATE_DATA_ROW,
	CLEAR_USER_DATA,
} from "./actionTypes";
import { getToken, postJsonRequest } from "dataModules";

// Route actions
export const goHome = () => ({ type: GO_HOME });
export const navigateToUrl = (url) => ({ type: NAVIGATE_TO_URL, payload: url });
// for investigation during development
// export const setInitialLocation = (location) => {
// 	const { href, origin, protocol, host, hostname, port, pathname, search, hash} = location;
// 	return { type: SET_WINDOW_LOCATION, payload:{ href, origin, protocol, host, hostname, port, pathname, search, hash, hashArr:hash.split("/") } }
// };

// UI Actions
export const openSettingsDialog = () => ({ type: OPEN_SETTINGS_DIALOG });
export const closeSettingsDialog = () => ({ type: CLOSE_SETTINGS_DIALOG });

export const openAboutDialog = () => ({ type: OPEN_ABOUT_DIALOG });
export const closeAboutDialog = () => ({ type: CLOSE_ABOUT_DIALOG });

export const openClearAlert = () => ({ type: OPEN_CLEAR_ALERT });
export const closeClearAlert = () => ({ type: CLOSE_CLEAR_ALERT });

export const openCartBox = () => ({ type: OPEN_CART_BOX });
export const closeCartBox = () => ({ type: CLOSE_CART_BOX });
export const toggleCartBox = () => ({ type: TOGGLE_CART_BOX });

export const toggleSidenav = () => ({ type: TOGGLE_SIDENAV });

// token actions async
export const fetchTokenRequest = () => ({ type: FETCH_TOKEN_REQUEST })
export const fetchTokenSucces = (tokenData) => ({ type: FETCH_TOKEN_SUCCESS, payload: tokenData })
export const fetchTokenError = (errInfo) => ({ type: FETCH_TOKEN_ERROR, payload: errInfo })

export const fetchToken = (unpas) => {
	return function (dispatch) {
		dispatch(fetchTokenRequest());
		getToken({
			...unpas,
			callBack: (udat) => dispatch(fetchTokenSucces(udat)),
			callError: (err) => dispatch(fetchTokenError(err))
		});
	}
}

// fetch JsonData
export const submitRequest = () => ({ type: SUBMIT_REQUEST })
export const submitRequestSucces = (jsn) => ({ type: SUBMIT_REQUEST_SUCCESS, payload: jsn })
export const submitRequestError = (errInfo) => ({ type: SUBMIT_REQUEST_ERROR, payload: errInfo })

// store data mangle
export const updateDataRow = (jsn) => ({ type: UPDATE_DATA_ROW, payload: jsn })
export const updateDataField = (jsn) => ({ type: UPDATE_DATA_FIELD, payload: jsn })
export const cancelUpdates = (dataSet) => ({ type: CANCEL_UPDATES, payload: dataSet })
export const updateData = (jsn) => ({ type: UPDATE_DATA_FIELD, payload: jsn })
export const reloadData = (dataSet) => ({ type: RELOAD_DATA, payload: dataSet })
export const prepareDataAction = (prm) => ({type: PREPARE_DATA_ACTION, payload: prm})
export const clearUserData = () => ({ type: CLEAR_USER_DATA})

export const executeDataAction = (dataSet) => {
	// returnin function is pattern for Redux_Trunk middlware
	return function (dispatch, getState) {
		const state = getState(); 
		var jsonQuery;
		switch(state.jsonData[dataSet].dataAction){
			case 'fetch':
				jsonQuery = state.jsonData[dataSet].jsonQuery;
			break;
			case 'submit':
				jsonQuery = {	
					table: state.jsonData[dataSet].table,
					sqlStatement: 'update',
					data: state.jsonData[dataSet].updData,
					keyData: state.jsonData[dataSet].jsonQuery.keyData
				}
			break;
			default:
				jsonQuery = state.jsonData[dataSet].jsonQuery;	
		}	
		dispatch(submitRequest());
		// console.log(jsonQuery);
		postJsonRequest({
			auToken: state.userToken.tokenData.auToken,
			request: jsonQuery,
			callBack: (udat) => { dispatch(submitRequestSucces({ ...udat, dataSet: dataSet })) }
		})
	}
}

export const submitJsonQuery = (args) => {
	var { dataSet, jsonQuery } = args;
	// returnin function is pattern for Redux_Trunk middlware
	return function (dispatch, getState) {
		dispatch(submitRequest());
		// console.log(jsonQuery);
		postJsonRequest({
			auToken: getState().userToken.tokenData.auToken,
			request: jsonQuery,
			callBack: (udat) => { dispatch(submitRequestSucces({ ...udat, dataSet: dataSet })) }
		})
	}
}

export const fetchFoods = () => {
	var { dataSet, jsonQuery } = 	{	
		dataSet: 'foodsAll',
		jsonQuery:{
			sqlStatement: "select",
			table: "Foods",
			fields: ["id", "title", "description", "size", "price", "imgFileName"]
		}
	};
	// returning function is pattern for Redux_Trunk middleware
	return function (dispatch, getState) {
		dispatch(submitRequest());
		// console.log(jsonQuery);
		postJsonRequest({
			auToken: getState().userToken.tokenData.auToken,
			request: jsonQuery,
			callBack: (udat) => { dispatch(submitRequestSucces({ ...udat, dataSet: dataSet })) }
		})
	}
}

export const fetchPhotoList = () => {
	var { dataSet, jsonQuery } = 	{	
		dataSet: 'photoList',
		jsonQuery:{
			phpFunction: 'photoList'
		}
	};
	// returning function is pattern for Redux_Trunk middleware
	return function (dispatch, getState) {
		dispatch(submitRequest());
		console.log(jsonQuery);
		postJsonRequest({
			auToken: getState().userToken.tokenData.auToken,
			request: jsonQuery,
			callBack: (udat) => { dispatch(submitRequestSucces({ ...udat, dataSet: dataSet })) }
		})
	}
}

// export apiCall = ()

// cart Actions
export const addToCart = (item) => ({ type: ADD_TO_CART, payload: item });
export const removeFromCart = (item) => ({ type: REMOVE_FROM_CART, payload: item });
export const clearCart = () => ({ type: CLEAR_CART });
export const addCartItemQuantity = (quant) => ({ type: ADD_CART_ITEM_QUANTITY, payload: quant })