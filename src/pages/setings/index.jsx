import React from 'react';
import { useSelector } from 'react-redux';
import { getNaviParams } from 'redux/selectors';
import ReactJson from 'react-json-view';

const SetingsPage = () => {
	const params = useSelector(getNaviParams);
	return (
		<div className='page'>
			<div className='box'>
				<p>Routing is OK??</p>
				<ReactJson src={params} />
			</div>
		</div>
	);
}

export default SetingsPage;