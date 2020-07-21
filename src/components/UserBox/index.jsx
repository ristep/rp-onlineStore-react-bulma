import React, { useState } from "react";
import { useDispatch } from 'react-redux';

// import "./index.scss";
import { imgUrl } from "dataModules";
import { addToCart } from "redux/actions";

const Box = (props) => {
	const { id, title, description, size, imgFileName, price  } = props;
	const [quantity, setQuantity] = useState(1);
	const dispatch = useDispatch();
	// console.log(props);	
	var topStyle = {
		backgroundImage: 'url(' + imgUrl + 'background.png)'
	};

	return (
		<div className="box">
			<div className="row header">
				<div className="boxTop" style={ topStyle }>
					<img onClick={() => window.location.href = '#/product/'+id+'/'+title } style={{maxWidth:"100%"} } src={imgUrl+imgFileName} alt="" />
				</div>
			</div>
			<div className="row content">
				<span className="title">
						{title}
				</span>
				<br/>
				<span className="description">
					{description} 
				</span>
			</div>
			<div className="row footer">
				<button className="addButton" onClick={() => dispatch(addToCart({ id, title, description, imgFileName, size, price, quantity }))}>Add to cart</button> 
				<button className="addButton cnt" onClick={() => setQuantity(quantity<12 ? quantity+1 : quantity)}>+</button>
				<label  className="quantity"> {quantity.toString().padStart(2, '0')} </label>
				<button className="addButton cnt" onClick={() => setQuantity(quantity>0 ? quantity-1 : quantity)}>-</button>
				<span 	className="foodBoxprice">${(price*quantity).toFixed(2)}</span>
			</div>	
		</div>
	)
}

export default Box;