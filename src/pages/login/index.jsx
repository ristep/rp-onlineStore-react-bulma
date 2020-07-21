import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { fetchToken } from 'redux/actions';
// import ReactJson from 'react-json-view';
// import { useCallback } from 'react';
import {useUserTitles, useIsLoggedIn} from 'redux/selectorHooks';
// import ReactJson from 'react-json-view';

const LoginForm = () => {
	const dispatch = useDispatch();
	const [data, setData] = useState({user:'', password:''});
	const isLoggedIn = useIsLoggedIn(); 
	const { firstName, secondName } = useUserTitles();
	const [fly, setFly] = useState({ flayable: false, loginError: false, inputBox: true }); 
	const [ ttls, setTtls] = useState({ logIn: "User Login", logOut: "Customer" });
	
	const cancel = ( () => {
		setData({user:'', password:''});
	});

	const submit = ( () => { 
		if(fly.flayable){
			dispatch(fetchToken({ userName: data.user, password: data.password }));
			setFly((fl) => ({ ...fl, flayable: false, loginError: true }));
		}
	});

	const logout = ( () => { 
		dispatch(fetchToken({ userName: 'anonymous', password: 'anonymous' }));
		cancel();
	});

	const onInputChange = ( (ev) => {
		setData( {...data, [ev.currentTarget.name]:ev.currentTarget.value} )
	});

	useEffect(() => {
		 setFly((fl) => ({ ...fl, flayable: data.user!=='' && data.password!=='', loginError: false }));
	},[data])

	useEffect(() => {
			setTtls((tt) => ({ ...tt, logIn: fly.loginError ? "Login Error" : "User Login" }));
	},[fly.loginError]);

	const keyHandle = (ev) => {
		// console.log(ev.key)
		switch(ev.key){
			case 'Enter': 
				submit()
			break;
			case 'Escape':
				cancel();
			break;
			default:
				return;
		}
	}  

	if(!isLoggedIn)
		return (
		<form>
			<div className={classNames(fly)} onKeyDown={(evn) => keyHandle(evn)}>
				<div className="boxTitle">
					<label>{ttls.logIn}</label>
				</div>
				<div className={"inputLabel"}>
					User Name
					<input type="text" name="user" placeholder="User Name" onChange={onInputChange} value={data.user || ''} />
				</div>
				<div className={"inputLabel"}>
					Password
					<input type="text" name="password" placeholder="Password" onChange={onInputChange} value={data.password || ''} />
				</div>	
				{ fly.flayable &&
					<div className="bottomLine">
						<div className="subButton submit" onClick={() => submit()}>Login</div>
						<div className="subButton cancel" onClick={() => cancel()}>Cancel</div>
					</div>
				}
				 {/* <ReactJson src={fly} />  */}
			</div>
		</form>
		);
	else
		return( 
		<form className='page' >
			<div className={'inputBox'}>
				<div className="boxTitle">
					<label>Customer</label>
				</div>
				<div className={"inputLabel"}>
					User Name
					<input type="text" name="user" placeholder="User Name" onChange={onInputChange} value={firstName+' '+secondName} disabled />
				</div>
				<div className="bottomLine">
					<div className="subButton submit" onClick={() => logout()} >Logout</div>
					<div className="subButton cancel" onClick={() => window.location.href = '#/user'} >User data</div>
				</div>
			</div>
		</form> 
	);
}

export default LoginForm;