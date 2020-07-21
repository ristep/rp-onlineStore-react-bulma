import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDataField, cancelUpdates, executeDataAction, prepareDataAction, navigateToUrl } from 'redux/actions';
import { getUserData, getUserDataTouched, getTouchedArr,  } from 'redux/selectors';
// import ReactJson from 'react-json-view';
import { useCallback } from 'react';
import { useUserToken } from 'redux/selectorHooks';
import { mdiLockReset } from '@mdi/js';
import NavLink from 'elements/navLink';
import Icon from '@mdi/react';

const UserData = () => {
	const dispatch = useDispatch();
	const data = useSelector(getUserData);
	const touched = useSelector(getUserDataTouched);
	const touchedArr = useSelector(getTouchedArr);
	const tokenData = useUserToken().tokenData;
	const changed = (field) => ((touchedArr ?  touchedArr.includes(field): false) ? " touched": ""	); 
	
	const reLoad = useCallback(() => {
		dispatch(prepareDataAction({ dataSet: "userData", dataAction:"fetch", keyData: { id: tokenData.id }}))
		dispatch(executeDataAction("userData"));
	},[dispatch,tokenData]);

	useEffect(() => {
		reLoad();
		return () => {console.log('CleanUp')};
	}, [dispatch,reLoad,tokenData]);

	const cancel = () => {
		dispatch(cancelUpdates("userData"));
	}

	const submit =  () => {
		dispatch(prepareDataAction({ dataSet: "userData", dataAction:"submit"}));
		dispatch(executeDataAction("userData"));
	};

	const onInputChange = (ev) => {
		dispatch(updateDataField({ 
			dataSet: 'userData', 
			field: ev.currentTarget.name, 
			value: ev.currentTarget.value }));
	};

	const lockClick = () => {
		window.location.href = "#/passwChange";
		//dispatch(navigateToUrl('passChange'));
	};

	if(data)
		return (
		<form className='page' >
			<div className='inputBox'>
			<div className="boxTitle">
				User Data
				<Icon path={mdiLockReset} className={"passChangeIcon"} onClick={lockClick}/>
			</div>
			<div className={"inputLabel" + changed("name")}>
				User Name
				<input type="text" name="name" placeholder="userName" onChange={onInputChange} value={data.name || ''} />
			</div>
			<div className={"inputLabel" + changed("first_name")}>
				First name
				<input type="text" name="first_name" placeholder="First name" onChange={onInputChange} value={data.first_name || ''} />
			</div>	
			<div className={"inputLabel" + changed("second_name")}>
				Second name
				<input type="text" name="second_name" placeholder="Second name" onChange={onInputChange} value={data.second_name || ''} />
			</div>
			<div className={"inputLabel" + changed("email")}>
				e-mail
				<input type="text" name="email" placeholder="e-Mail" onChange={onInputChange} value={data.email || ''} />
			</div>	
			<div className={"inputLabel" + changed("address")}>
				Address
				<input type="text" name="address" placeholder="Address" onChange={onInputChange} value={data.address || ''} />
			</div>	
			<div className={"inputLabel" + changed("place")}>
				Place
				<input type="text" name="place" placeholder="Place" onChange={onInputChange} value={data.place || ''} />
			</div>	
			{ touched && 
				<div className="bottomLine">
					<div className="subButton submit" onClick={() => submit()}>Submit</div>
					<div className="subButton cancel" onClick={() => cancel()}>Cancel</div>
				</div>
			}
			{/* <ReactJson src={data} /> */}
			</div>
		</form>
		);
	else
		return( <div></div> );
}

export default UserData;