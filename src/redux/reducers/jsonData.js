import produce from "immer";
import {
	UPDATE_DATA_FIELD,
	CANCEL_UPDATES,
	SUBMIT_REQUEST_ERROR,
	SUBMIT_REQUEST_SUCCESS,
	SUBMIT_REQUEST,
	PREPARE_DATA_ACTION,
	UPDATE_DATA_ROW,
	CLEAR_USER_DATA
} from 'redux/actionTypes';

export const initialState = () => {
	return {
		isFetching: false,
		foodDetail: {
			dataAction: 'done',
			dataSet: "foodDetail",
			table: "Foods",
			OK: false,
			editable: true,
			error: false,
			message: 'empty',
			count: 0,
			keyData: { id: '' },
			data: [],
			oriData: [],
			jsonQuery: {
				sqlStatement: "select",
				table: "Foods",
				fields: ["id", "title", "description", "size", "price", "imgFileName"],
				keyData: { id: undefined }
			}
		},
		foodsAll: {
			dataAction: 'done',
			dataSet: "",
			editable: false,
			OK: false,
			error: false,
			message: 'empty',
			Sql: "",
			count: 0,
			data: [],
		},
		usersAll: {
			dataAction: 'done',
			dataSet: "",
			editable: true,
			OK: false,
			error: false,
			message: 'empty',
			Sql: "",
			count: 0,
			data: [],
		},
		userData: {
			dataAction: 'done',
			dataSet: "userData",
			table: "users",
			OK: false,
			editable: true,
			error: false,
			message: 'empty',
			count: 0,
			data: [ {
        id: -1,
        name: '????',
        role: '????',
        first_name: '?',
        second_name: '',
        email: '',
        address: '??',
        place: '??',
        state: '',
        password: ''
      }],
			oriData: [],
			jsonQuery: {
				sqlStatement: "select",
				table: "users",
				fields: ["id", "name", "role", "first_name", "second_name", "email", "address", "place", "state", "password"],
				keyData: { id: undefined }
			}
		},
		photoList: {
			OK:false,
			dataSet:"photoList",
			data:[],
		}
	}
};

export default (state = initialState(), action) =>
	produce(state, draft => {
		switch (action.type) {
			case PREPARE_DATA_ACTION:
				const { dataAction, dataSet, keyData } = action.payload;
				draft[dataSet].dataAction = dataAction;
				if (keyData)
					draft[dataSet].jsonQuery.keyData = keyData;
				break;
			case CANCEL_UPDATES:
				if (draft[action.payload].editable) {
					draft[action.payload].data = draft[action.payload].oriData;
					draft[action.payload].dataTouched = undefined;
				}
				break;

			case UPDATE_DATA_ROW:
				// console.log(action.payload)
				draft[action.payload.dataSet].data[action.payload.index] = action.payload.dataRow;
				break;	

			case UPDATE_DATA_FIELD:
				let ndx = 0; // temporal 
				if(action.payload.index!==undefined) ndx=action.payload.index;
				draft[action.payload.dataSet].data[ndx][action.payload.field] = action.payload.value;
				if (draft[action.payload.dataSet].dataTouched === undefined)
					draft[action.payload.dataSet].dataTouched = [];
				draft[action.payload.dataSet].dataTouched = Array.from(new Set([...draft[action.payload.dataSet].dataTouched, action.payload.field]));
				if (draft[action.payload.dataSet].updData === undefined)
					draft[action.payload.dataSet].updData = {};
				draft[action.payload.dataSet].updData[action.payload.field] = action.payload.value;
				break;

			case SUBMIT_REQUEST:
				draft.isFetching = true;
				break;

			case SUBMIT_REQUEST_SUCCESS:
				draft.isFetching = false;
				draft[action.payload.dataSet] = { ...draft[action.payload.dataSet], ...action.payload };
				if (draft[action.payload.dataSet].editable)
					draft[action.payload.dataSet].oriData = draft[action.payload.dataSet].data;
				else
					draft[action.payload.dataSet].oriData = undefined;
				draft[action.payload.dataSet].dataTouched = undefined;
				draft[action.payload.dataSet].updData = undefined;
				break;

			case SUBMIT_REQUEST_ERROR:
				draft.isFetching = false;
				break;

			case CLEAR_USER_DATA:
				draft.userData = initialState.userData;	
				break;

			default:
			 	return draft;
		};
		// return draft;
	});

