import reducer from './userToken';
import {
	FETCH_TOKEN_REQUEST,
	FETCH_TOKEN_SUCCESS,
	FETCH_TOKEN_ERROR
} from 'redux/actionTypes';
import {initialState} from './userToken';

const initState = initialState();

const testState =
{
	isFetching:true,
	isValid:false,
	hasError: false,
}

// some trivial tests
describe('userToken reducer test', () => {

	it('should return the initial state', () => {
		expect(reducer(undefined, { type: 'dummy' })).toEqual(initState);
	});

  it('should FETCH_TOKEN_REQUEST', () => {
		expect(
			reducer( undefined, {	type: FETCH_TOKEN_REQUEST	})
		).toEqual(
			{ ...initState, isFetching: true, isValid: false, hasError: true }
		)
	});

	it('should handle FETCH_TOKEN_SUCCESS', () => {
		expect(
			reducer( { isFetching: undefined, isValid: undefined, hasError: undefined }, {	type: FETCH_TOKEN_SUCCESS	})
		).toEqual( { isFetching: false, isValid:true, hasError: false } );
	});

	it('should handle FETCH_TOKEN_ERROR', () => {
		expect(
			reducer( undefined,	{	type: FETCH_TOKEN_ERROR })
		).toEqual({ ...initState, isFetching:false, isValid:false,	hasError:true } );
	});

})