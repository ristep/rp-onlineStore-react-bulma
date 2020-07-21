import produce from "immer";
import {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	CLEAR_CART,
	ADD_CART_ITEM_QUANTITY
} from '../actionTypes'

const initialState = () => ({
	itemCount: 0,
	amount: 0,
	items:[]
});

export default (state = initialState(), action) =>
	produce(state, draft => {
		switch (action.type) {
			case ADD_TO_CART: {
				const { price, quantity } = action.payload;
				const count = draft.items.length;
				draft.itemCount = draft.itemCount+1;
				draft.amount = draft.amount + action.payload.quantity*action.payload.price;
				draft.items.push({...action.payload, amount: quantity*price ,index: count}) 
				break;
			}
			case REMOVE_FROM_CART: {
				draft.itemCount--;
				draft.amount -= draft.items[action.payload].amount;
				draft.items.splice(action.payload, 1);
				break;
			}
			case ADD_CART_ITEM_QUANTITY: {
				const { index, quantity } = action.payload;
				draft.amount = draft.amount - draft.items[index].amount;
				draft.items[index].quantity += quantity;
				if( draft.items[index].quantity < 0)
					draft.items[index].quantity = 0;
				draft.items[index].amount = draft.items[index].price*draft.items[index].quantity;
				draft.amount = draft.amount + draft.items[index].amount;
				break;
			}
			case CLEAR_CART: {
				draft = initialState();
				break;
			}
			default:
				return draft;
		}
		return draft;
	});
