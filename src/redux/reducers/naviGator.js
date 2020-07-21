import produce from "immer";

import {  
		GO_HOME,
		NAVIGATE_TO_URL,
//		SET_WINDOW_LOCATION // needet only in development of naviGator
} from '../actionTypes';
import { validPages, errPage, homePage } from "routes";

const initialState = () => ({
	url: "/#home",
	page: 'home',
	params:[],
	validPages,
	errPage,
	history:[],
	// windowLocation: {}  // Has been used during development
});

const urlReplace = (url) => {
	window.history.replaceState( {}, null, url );
	// window.history.pushState( {id: url }, null, url );
	// window.location.href = url;
};

export default (state = initialState(), action) =>
	produce(state, draft => {
		switch (action.type) {
			case GO_HOME: {
				draft.url = '#/'+homePage;
				draft.history.push(draft.url);
				draft.page = homePage;
				draft.params = [];
				urlReplace(draft.url);
				break;
			}
			case NAVIGATE_TO_URL: {
				draft.url = action.payload;
				if(draft.url==='' || draft.url===undefined ) {
					draft.url = '#/'+homePage;
					draft.page = homePage;
					draft.params = [];
				}else{
					const arr = draft.url.split('/');
					if( draft.validPages.includes(arr[1]) ){
						draft.page = arr[1];
						draft.params = arr.slice(2);
					}else{
						draft.page = draft.errPage;
						draft.url = '#/'+draft.page;
					}
				}
				draft.history.push(draft.url);
				urlReplace(draft.url);
				break;
			}
			// case SET_WINDOW_LOCATION:{
			// 	draft.windowLocation = action.payload;
			// 	break;
			// }	
			default:
				return draft;
		}
		return draft;
	});

