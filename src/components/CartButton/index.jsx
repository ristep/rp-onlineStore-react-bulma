import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getCartDataSet } from "redux/selectors";
import { toggleCartBox } from "redux/actions";
import "./index.scss";

const CartButton = () => {
	const { itemCount, amount } = useSelector(getCartDataSet); 
	const dispatch = useDispatch();
	
	return (
		<button className="CartButton" onClick={() => dispatch(toggleCartBox())}>
			Cart {itemCount}  ${amount.toFixed(2)} 
		</button> 
	);
}

export default CartButton;