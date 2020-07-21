import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFoodsAll } from "redux/selectors";
import  Box from "components/FoodBox";
import Favicon from 'react-favicon';
import { submitJsonQuery } from "redux/actions";

function ProductsPage() { 
	// const userToken = useSelector(getUserToken);
	const dispatch = useDispatch();
	const foodsAll = useSelector(getFoodsAll); //optained data from server
	
	useEffect(() => {
		dispatch(submitJsonQuery({	
			dataSet: 'foodsAll',
			jsonQuery:{
				sqlStatement: "select",
				table: "Foods",
				fields: ["id", "title", "description", "size", "price", "imgFileName"]
			}
		}));
	}, [dispatch]);;

  return (
		<div className="container">
		<div className="columns is-multiline" >
			<Favicon url="../pizzaFab.png" />
			{[...foodsAll.data.map((x, i) =>
				<div  className="column is-one-third">
					<Box {...x} key={i} />
				</div>	
			)]}
		</div>
		</div>
  );
}

export default ProductsPage;
