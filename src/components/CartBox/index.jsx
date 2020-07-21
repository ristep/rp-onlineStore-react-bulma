import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCartBoxState, getCartDataSet } from 'redux/selectors';
import { closeCartBox, clearCart, removeFromCart, addCartItemQuantity } from 'redux/actions';
import { useUserTitles } from 'redux/selectorHooks';

const CartBox = () => {
	const { firstName, secondName } = useUserTitles();
	const boxState = useSelector(getCartBoxState);
	const [rend, setRend] = useState(false);
	const dispatch = useDispatch();
	const { itemCount, amount, items } = useSelector(getCartDataSet); 
	const [anime, setAnime] = useState('closed');

	useEffect(() => {
		if(boxState) 
			setRend(true);
		setAnime(boxState ? 'opening': 'closing'); 
  },[boxState]);

	const animationEnd = () => {
		if (!boxState) 
			setRend(false);
  };

	return (
		rend && 
		<div className='modal'  onAnimationEnd={() => animationEnd()}>
			<div className={"modalContent "+anime} >
				<div className="modalHeader">
				<div style={{width:"100%"}}>
					<div align="left">Shopping Cart</div> 
					<div align="right">{firstName} {secondName}</div>
					<div align="right">${amount.toFixed(2)}</div>
				</div>
				</div>
				<div className="modalBody">
					{[...items.map((item, i) =>
						<div className="cartRow" key={i}>
							<div className="row footer">
								<button className="cartTinyButton itemRemove" onClick={(() => dispatch(removeFromCart(i)))}>Remove</button>
								<button className="cartTinyButton minus" onClick={() => dispatch(addCartItemQuantity({ index:i, quantity:-1 }))}>-</button>
								<button className="cartTinyButton plus" onClick={() => dispatch(addCartItemQuantity({ index:i, quantity: 1 }))}>+</button>
							</div>	
							<span className="title">
								{item.title}
							</span>
							<span className="cartBoxPrice">
								{ item.quantity>1 ? item.quantity + ' x $' + item.price.toFixed(2) + ' = ' : ''} ${(item.price*item.quantity).toFixed(2)}
							</span>
							<br />
							<span className="description">
								{item.description} 
							</span>
						</div>
					)]}
					<div>
						<p className="cartSummary">{itemCount} Items,    Amount: ${amount.toFixed(2)} </p>
					</div>
					<div className="modalSummary">
						<button className='close button' onClick={() => dispatch(closeCartBox())} >Close</button>
						<button className='placeOrder button' onClick={() => dispatch(closeCartBox())} >Place an order</button>
						<button className='empty button' onClick={() => dispatch(clearCart())} >Empty Cart</button>
					</div>
					{/* <ReactJson src={items} /> */}
				</div>
			</div>
		</div>	
	);
}

export default CartBox;
