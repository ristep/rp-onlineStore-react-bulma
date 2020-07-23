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
	const { firstName, secondName, userName } = useUserTitles();
	const [fly, setFly] = useState({ flayable: false, loginError: false, inputBox: true }); 
	const [ ttls, setTtls] = useState({ logIn: "User Login", logOut: "Customer" });
	
	const cancel = ( () => {
		setData({user:'', password:''});
	});

	const submit = ( () => { 
		if(fly.flayable){
			dispatch(fetchToken({ userName: data.user, password: data.password }));
			setFly((fl) => ({ ...fl, flayable: false, loginError: true }));
			console.log(fly);
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
		<form style={{maxWidth: '520px'}}>
			<div className={classNames({ fly })} onKeyDown={(evn) => keyHandle(evn)}>
				<div className={"title is-3 "+ (fly.loginError?' has-text-danger': 'has-text-info')}>
					{ttls.logIn}
				</div>
				<div className={"field"}>
					<label>User Name</label>
					<input className="input" type="text" name="user" placeholder="User Name" onChange={onInputChange} value={data.user || ''} />
				</div>
				<div className={"field"}>
					<label>
						Password
					</label>
					<input className="input" type="text" name="password" placeholder="Password" onChange={onInputChange} value={data.password || ''} />
				</div>	
				{ fly.flayable &&
					<div className="buttons is-right">
						<div className="button is-rounded " onClick={() => cancel()}>Cancel</div>
						<div className="button is-rounded is-primary" onClick={() => submit()}>Login</div>
					</div>
				}
				 {/* <ReactJson src={fly} />  */}
			</div>
		</form>
		);
	else
		return( 
			<form className='form'>
				<div style={{ maxWidth: '520px'}}>
					<div className={'inputBox'}>
						<div className={"title is-3 has-text-info"}>
							<label>You are signed in as:</label>
						</div>

						<div className='field'>
							<label className='label'>
								User Name
							</label>
							<input className="input is-large" disabled type="text" name="user" placeholder="User Name" onChange={onInputChange} value={userName} />
						</div>

						<div className={"field"}>
							<label className="label">
								Name and second name
							</label>
							<input className="input is-large" disabled type="text" name="user" placeholder="User Name" onChange={onInputChange} value={firstName+' '+secondName} />
						</div>
						<div className="buttons is-right">
							<div className="button is-rounded" onClick={() => window.location.href = '#/user'} >User data</div>
							<div className="button is-rounded is-danger" onClick={() => logout()} >Logout</div>
						</div>
					</div>
				</div> 
			</form>
	);
}

export default LoginForm;