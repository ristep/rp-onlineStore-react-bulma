import reducer from './uiState';
import * as types from '../actionTypes';

const initialState = {
	settingsDialogState: false,
	clearWorldAlertState: false,
	aboutDialogState: false,
	cartBoxOpened:false,
}
// some trivial tests
describe('uiState reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	it('should handle OPEN_SETTINGS_DIALOG', () => {
		expect(
			reducer(undefined, {
				type: types.OPEN_SETTINGS_DIALOG
			})
		).toEqual(
			{ ...initialState,settingsDialogState: true	}
		)
	});

	it('should handle CLOSE_SETTINGS_DIALOG', () => {
		expect(
			reducer({ ...initialState,settingsDialogState: true	}, {
				type: types.CLOSE_SETTINGS_DIALOG,
			})
		).toEqual( initialState	);
	});

	it('should handle OPEN_ABOUT_DIALOG', () => {
		expect(
			reducer(undefined, {
				type: types.OPEN_ABOUT_DIALOG,
			})
		).toEqual({ ...initialState, aboutDialogState: true });
	});
	it('should handle CLOSE_ABOUT_DIALOG', () => {
		expect(
			reducer({ ...initialState, aboutDialogState: true	}, {
				type: types.CLOSE_ABOUT_DIALOG,
			})
		).toEqual( initialState	);
	});

	it('should handle OPEN_CLEAR_ALERT', () => {
		expect(
			reducer( undefined, {  type: types.OPEN_CLEAR_ALERT } )
		).toEqual({ ...initialState, clearWorldAlertState: true })
	});
	it('should handle CLOSE_CLEAR_ALERT', () => {
		expect(
			reducer({ clearWorldAlertState: true }, { type: types.CLOSE_CLEAR_ALERT } )
		).toEqual({ clearWorldAlertState: false })
	})

	it('should handle OPEN_CART_BOX', () => {
		expect(
			reducer(undefined, {
				type: types.OPEN_CARD_BOX,
			})
		).toEqual(
			{ ...initialState,cartBoxOpened: true	}
		)
	});
	it('should handle CLOSE_CART_BOX', () => {
		expect(
			reducer(undefined, {
				type: types.CLOSE_CARD_BOX,
			})
		).toEqual(
			{ ...initialState,cartBoxOpened: false	}
		)
	});

})