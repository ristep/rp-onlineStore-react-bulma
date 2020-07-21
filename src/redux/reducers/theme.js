//import { green } from "ansi-colors";

const initialState = {
	color: {
		primaryDark: '#303F9F',
		primary: '#3F51B5',
		primaryLight: '#C5CAE9',
		textIcon: '#FFFFFF',
		secondary: '#03DAC5',
		primaryText: '#212121',
		secondaryText: '#FFFFFF',
		devider: '#BDBDBD',
		accent: '#FF5722',
		background: '#F9F8F9',
		surface: '#F1F8E9',
		button: {
			green: '#009688',
			blue: '#0288D1',
			red: '#FF5722'
		}
	},
	fonts: {},
	sizes: {},
}

export const getColors = (state) => ( state.theme.color );
export const getButtonColors = (state) => ( state.theme.color.button );

export default function (state = initialState, action) {
	switch (action.type) {
		// case OPEN_SETTINGS_DIALOG:{
		// 	return { ...state, settingsDialog:true };
		// }	
		// case CLOSE_SETTINGS_DIALOG:{
		// 	return { ...state, settingsDialog:false };
		// }	
		default:
			return state;
	}
}	
