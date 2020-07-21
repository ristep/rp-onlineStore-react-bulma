import * as actions from './actions';
import { OPEN_SETTINGS_DIALOG, CLOSE_SETTINGS_DIALOG, OPEN_ABOUT_DIALOG, CLOSE_ABOUT_DIALOG, OPEN_CLEAR_ALERT, CLOSE_CLEAR_ALERT, FETCH_TOKEN_PENDING, FETCH_TOKEN_SUCCESS, FETCH_TOKEN_ERROR, FETCH_TOKEN_REQUEST } from './actionTypes';

// some pointless action creator tests :D
describe('actions', () => {
	it('should create an action to openSettingsDialog state', () => {
    const expectedAction = { type: OPEN_SETTINGS_DIALOG };
    expect(actions.openSettingsDialog()).toEqual(expectedAction);
	})
	it('should create an action to closeSettingsDialog state', () => {
    const expectedAction = { type: CLOSE_SETTINGS_DIALOG };
    expect(actions.closeSettingsDialog()).toEqual(expectedAction);
	})
	it('should create an action to openAboutDialog state', () => {
    const expectedAction = { type: OPEN_ABOUT_DIALOG };
    expect(actions.openAboutDialog()).toEqual(expectedAction);
	})
	it('should create an action to resurrectCell state', () => {
    const expectedAction = { type: CLOSE_ABOUT_DIALOG };
    expect(actions.closeAboutDialog()).toEqual(expectedAction);
	})
	it('should create an action to openClearAlert state', () => {
    const expectedAction = { type: OPEN_CLEAR_ALERT };
    expect(actions.openClearAlert()).toEqual(expectedAction);
  })
	it('should create an action to resurrectCell state', () => {
    const expectedAction = { type: CLOSE_CLEAR_ALERT };
    expect(actions.closeClearAlert()).toEqual(expectedAction);
	})
	
	it('should create an action to fetch user token state', () => {
    const expectedAction = { type: FETCH_TOKEN_REQUEST};
    expect(actions.fetchTokenRequest()).toEqual(expectedAction);
	})
	
	it('should create an action to fetch user token state', () => {
		const tokenData =
		{
			id: "5",
			name: "mavro",
			email: "mavricius@yahoo.com",
			first_name: "mавро",
			second_name: "🍺🍻🍸😎😉😃",
			role: "user",
			jti: "20-01-18 20:01:46",
			auToken: "eyJ0eXAiOiJKV1QiLCJhbGcDvmzDxigVg91QmFW0NLrFLJSKnGW1IOU"
		}
    const expectedAction = {type: FETCH_TOKEN_SUCCESS, payload: tokenData};
    expect(actions.fetchTokenSucces(tokenData)).toEqual(expectedAction);
  })
	it('should create an action to fetch user token state', () => {
    const expectedAction = { type: FETCH_TOKEN_ERROR };
    expect(actions.fetchTokenError()).toEqual(expectedAction);
	})
	
})