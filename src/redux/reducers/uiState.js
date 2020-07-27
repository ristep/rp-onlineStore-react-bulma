import produce from "immer";
import {
	OPEN_SETTINGS_DIALOG,
	CLOSE_SETTINGS_DIALOG,
	CLOSE_ABOUT_DIALOG,
	OPEN_ABOUT_DIALOG,
	OPEN_CLEAR_ALERT,
	CLOSE_CLEAR_ALERT,
	OPEN_CART_BOX,
	CLOSE_CART_BOX,
	TOGGLE_CART_BOX,
	TOGGLE_SIDENAV,
	} from 'redux/actionTypes';

const initialState = {
	settingsDialogState: false,
	clearWorldAlertState: false,
	aboutDialogState: false,
	cartBoxIsOpen: true,
	sidenavState: false,
}

export default (state = initialState, action) =>
	produce(state, draft => {
		switch (action.type) {
			case OPEN_SETTINGS_DIALOG: 
				draft.settingsDialogState = true;
				break;
			
			case CLOSE_SETTINGS_DIALOG: 
				draft.settingsDialogState = false;
				break;
			
			case OPEN_ABOUT_DIALOG: 
				draft.aboutDialogState = true;
				break;
			case CLOSE_ABOUT_DIALOG: 
				draft.aboutDialogState = false;
				break;
			
				case OPEN_CLEAR_ALERT: 
				draft.clearWorldAlertState = true;
				break;
			
			case CLOSE_CLEAR_ALERT: 
				draft.clearWorldAlertState = false;
				break;
			
			case OPEN_CART_BOX: 
				draft.cartBoxIsOpen = true;
				break;
			
			case CLOSE_CART_BOX: 
				draft.cartBoxIsOpen = false;
				break;
			
			case TOGGLE_CART_BOX:
				draft.cartBoxIsOpen = !draft.cartBoxIsOpen;
				break;

			case TOGGLE_SIDENAV:
				draft.sidenavState = !draft.sidenavState;
				break;
				
			default:
				return draft;
		}
		return draft;
	});
