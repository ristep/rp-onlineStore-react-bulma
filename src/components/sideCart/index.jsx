import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import {  getCartDataSet } from 'redux/selectors';
import { closeCartBox, clearCart, removeFromCart, addCartItemQuantity } from 'redux/actions';
import { useUserTitles } from 'redux/selectorHooks';
import { ReactComponent as CartLarge } from '../../images/shopping-cart-solid.svg';
import { imgUrl } from "dataModules";

const sliko = {
	fill: 'rgb(106, 191, 176)',
	whith: '24px',
	height: '24px',
	padding: '0.2em'
}

const btnInfo = {
	flexGrow: 1,
  flexShrink: 1,
	fontWeight: '800'
};

const flex = {
	display: 'flex',
}
const butpad = {
	paddingTop: '0.2rem',
	bacgroundColor:'red'
}

const SideCart = () => {
	const { firstName, secondName } = useUserTitles();
	const dispatch = useDispatch();
	const { itemCount, amount, items } = useSelector(getCartDataSet); 

	const TinkiVinki = (i,item ) => {

	const tinkiStyle = { 
			with: `48px`, 
			height: `auto`, 
			// backgroundImage: `url(${imgUrl+item.imgFileName})`,
			// backgroundRepeat: `no-repeat`,
			// backgroundSize: `48px 32px`,
	}
		
	return(
		<div style={tinkiStyle} >							
  			<i className="fas fa-plus-circle has-text-success" onClick={() => dispatch(addCartItemQuantity({ index:i, quantity: 1 }))}></i>
  			<i className="fas fa-minus-circle has-text-warning" onClick={() => dispatch(addCartItemQuantity({ index:i, quantity:-1 }))} ></i>
  			<i className="fas fa-trash-alt has-text-danger" onClick={(() => dispatch(removeFromCart(i)))}></i>
		</div>
	)};

	return (
		<div className='box'>

			<div className="columns">
				<div align="left" className="column">
						<CartLarge style={sliko} />
				</div>	
				<span align='left' className="column is-size-5">
					<p>{firstName} {secondName}</p>
				</span>
			</div>

			<table className="table is-fullwidth">
				<tr className="th is-selected">
					<th>Product</th>
					<th></th>
					<th align="right">Amount</th>
				</tr>
				{[...items.map((item, i) =>
					<tr className="tr" key={i}>
						<td className='is-narrow'>
							{TinkiVinki(i,item)}
						</td>
						<td className="td" align={"left"}>
							{item.quantity} {item.title}
						</td>
						<td align="right">
							${(item.price*item.quantity).toFixed(2)}
						</td>
					</tr>
				)]}
			<tfoot>
			 <tr>
				<td></td> 
				<td align={'right'}>Total</td>
				<td align={'right'}>{amount.toFixed(2)}</td>
				</tr>	
			</tfoot>	
			</table>				
			<div className='buttons is-centered'  style={flex}>
				<button className='button is-rounded' onClick={() => dispatch(closeCartBox())} >Place an order</button>
				<button className='button is-primary is-rounded is-danger' onClick={() => dispatch(clearCart())} >Empty Cart</button>
			</div>
			{/* <ReactJson src={items} /> */}
		</div>
	);
}

export default SideCart;


//code dumpm
//<button className="button is-small is-rounded is-warning" onClick={(() => dispatch(removeFromCart(i)))}>Remove</button>
//<button className="button is-small is-rounded" onClick={() => dispatch(addCartItemQuantity({ index:i, quantity:-1 }))}><i className="fas fa-minus"/></button>
