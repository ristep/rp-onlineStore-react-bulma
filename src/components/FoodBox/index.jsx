import React, { useState } from "react";
import { useDispatch } from 'react-redux';

import { imgUrl } from "dataModules";
import { addToCart } from "redux/actions";
// import { useAuToken } from "redux/selectorHooks";

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
}

const Box = (props) => {
	const { id, title, description, size, imgFileName, price  } = props;
	const [quantity, setQuantity] = useState(1);
	const dispatch = useDispatch();
	// console.log(props);	
	var topStyle = {
		backgroundImage: 'url(' + imgUrl + 'background.png)'
	};

	const titlovi = () => (
		<div>
			<a className="title is-size-4 is-italic has-text-weight-normal" href={'#/product/'+id+'/'+title}>{title}</a>
			<br /> 
			<p className="subtitle has-text-white is-size-6">{description}</p>
			<p className="subtitle" />
		</div>
	);

	const esap = () => (
		<div>
			{quantity > 1 &&
			<label className="title is-size-5 has-text-white" disabled>${(price).toFixed(2)+" X "+quantity.toString().padStart(1, '0')} </label>
			}
			<label className="title is-pulled-right has-text-white" disabled>${(price*quantity).toFixed(2)}</label>
		</div>
	)

	return (
		<div className="box ">
			<div className="header" >
				<div className="card-image" style={ topStyle } onClick={() => window.location.href = '#/product/'+id+'/'+title} >
				<figure className="image is-4by3">
					<img src={imgUrl+imgFileName} alt="" />
				</figure>
				<div className="content is-overlay">
					{titlovi()}
					{esap()}
				</div>
			</div> 
			</div>
			<div style={butpad}>
				<div style={flex}>
					<button className="button is-rounded is-small is-static" style={btnInfo}>{quantity.toString().padStart(2, '0')}</button>
					<button className="button is-primary is-small is-rounded" onClick={() => setQuantity(quantity<12 ? quantity+1 : quantity)}><i className="fas fa-plus" /></button>
					<button className="button is-primary is-small is-rounded is-warning" onClick={() => setQuantity(quantity>0 ? quantity-1 : quantity)}><i className="fas fa-minus"/></button>
					<button className="button is-primary is-small is-rounded is-danger" onClick={() => dispatch(addToCart({ id, title, description, imgFileName, size, price, quantity }))}><i className="fas fa-cart-plus"></i></button> 
				</div>	
			</div>	
		</div>
	)
}

export default Box;