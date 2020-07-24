import React, { useEffect, useCallback } from "react";
import ReactJson from 'react-json-view';
import { useDispatch, useSelector } from "react-redux";
import {  prepareDataAction, executeDataAction } from "redux/actions";
import { getFoodDetail, getNaviParams } from "redux/selectors";
import { imgUrl } from "dataModules";

const ProductPage = () => {
	const dispatch = useDispatch();
	const params = useSelector(getNaviParams);
	const data = useSelector(getFoodDetail);
	const variant = params[1];
	
  const reLoad = useCallback(() => {
		dispatch(prepareDataAction({ dataSet: "foodDetail", dataAction:"fetch", keyData: { id: params[0] }}))
		dispatch(executeDataAction("foodDetail"));
	}, [dispatch,params] );
	
	// const cancel = () => {
	// 	dispatch(cancelUpdates("foodDetail"));
	// }
	// const submit = () => {
	// 	dispatch(prepareDataAction({ dataSet: "foodDetail", dataAction:"submit"}))
	// 	dispatch(executeDataAction("foodDetail"));
	// }

  useEffect(() => {
		reLoad();
	}, [dispatch,reLoad]);

	return (
		<div className='page'>
			<div className='box'>
				{data &&	<img src={imgUrl+data.imgFileName} alt='' /> }		
				<div className="foodDetail">
					<div>
						<ReactJson src={data} />
						<p>{params[0]}</p>
						<p>variant={variant}</p>
					</div>
				</div>
				<div className='bottomBar'>
					<button className="backButton" onClick={() => window.history.go(-1)}>Back</button> 
				</div>
			</div>	
		</div>
	);
}

export default ProductPage;