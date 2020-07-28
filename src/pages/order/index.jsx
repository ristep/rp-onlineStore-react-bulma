import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCartDataSet } from 'redux/selectors';
import { closeCartBox, clearCart, removeFromCart, addCartItemQuantity, navigateToUrl } from 'redux/actions';
import { useUserTitles, useUserData } from 'redux/selectorHooks';
import { ReactComponent as CartLarge } from '../../images/shopping-cart-solid.svg';
import ReactJson from 'react-json-view';
// import { imgUrl } from "dataModules";

const sliko = {
	fill: 'rgb(106, 191, 176)',
	whith: '24px',
	height: '24px',
	padding: '0.2em'
}

const flex = {
	display: 'flex',
}

const Order = () => {
  // const { firstName, secondName } = useUserTitles();
  const userData = useUserData();
	const dispatch = useDispatch();
	const { amount, items } = useSelector(getCartDataSet); 

  const onPlaceOrderClick = () => {
    alert("Order has been procesed");
  };

	const TinkiVinki = (i,item ) => {
	const tinkiStyle = { 
			with: `12px`, 
			height: `auto`, 
			// backgroundImage: `url(${imgUrl+item.imgFileName})`,
			// backgroundRepeat: `no-repeat`,
			// backgroundSize: `48px 32px`,
	};
	
	return(
		<div className='icons-group' style={tinkiStyle} >							
  			<i className="fas fa-plus-circle has-text-success" onClick={() => dispatch(addCartItemQuantity({ index:i, quantity: 1 }))}></i>
  			<i className="fas fa-minus-circle has-text-warning" onClick={() => dispatch(addCartItemQuantity({ index:i, quantity:-1 }))} ></i>
  			<i className="fas fa-trash-alt has-text-danger" onClick={(() => dispatch(removeFromCart(i)))}></i>
		</div>
	)};

  return (
    <>
    <div className="box">
      <label className="title is-4">
        Shipping Information 
      </label>
      {/* <ReactJson src={userData} /> */}
      <p>{userData.first_name}  {userData.second_name}</p>
      <p>{userData.address}</p>
      <p>{userData.place}</p>
    </div>
    <div className="box">
      <label className="title is-4">
        Payment Method
      </label>
      <p>Payment will be made after delivery!</p>  
    </div>
		<div className='box'>

			<div className="columns mb-0 mt-1">
				<div align="left" className="column">
          <label className="title">
            Order Review
          </label>  
				</div>	
			</div>

			<table className="table is-fullwidth mt-0 mb-0 ">
				<thead>
					<tr className="th is-selected">
						<th></th>
						<th>Foods</th>
						<th align="right">Amount</th>
					</tr>
				</thead>
				<tbody>
					{[...items.map((item, i) =>
						<tr className="tr" key={i}>
							<td className='pl-1 mr-0 pr-1'>
								{TinkiVinki(i,item)}
							</td>
							<td className="ml-0 pl-1" >
								<a href={"#/product/"+item.id} > {item.quantity} {item.title} </a>
							</td>
							<td align="right">
								${(item.price*item.quantity).toFixed(2)}
							</td>
						</tr>
					)]}
				</tbody>
			</table>				
			<div className="columns mt-2 mb-0 pv-0">
					<p className="title column mb-0">Total</p>
					<p className='title column mb-0' align='right'>${amount.toFixed(2)}</p>
			</div>
			<div className='buttons is-centered'  style={flex}>
				{/* <button className='button is-rounded' onClick={} >Cancel</button> */}
				<button className='button is-rounded is-default' onClick={() => onPlaceOrderClick()}>Place an order</button>
			</div>
			{/* <ReactJson src={items} /> */}
		</div>
    </>
	);
}

export default Order;
