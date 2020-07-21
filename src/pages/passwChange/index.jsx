import React, { useState, useEffect, useRef } from 'react';
import Icon from '@mdi/react';
import { mdiEyeOffOutline, mdiEyeOutline  } from '@mdi/js';

// import ReactJson from 'react-json-view';
import { useAuToken, useUserTitles } from 'redux/selectorHooks';
import { postJsonRequest } from 'dataModules';

const PasswChange = () => {
	const curpassEl = useRef(null);
	const auToken = useAuToken();
	const { userId,	userName,	userEMail, userRole } = useUserTitles();
	const [passw, setPassw] = useState({currPassw:'',newPasswA:'',newPasswB:''});
	const [okce, setOkce] = useState(false);
	const [nomatch, setNomatch] = useState('');
	const [canFly, setCanFly] = useState(false);
	const [currPass, setCurrPass] = useState({ ok: true, title: 'Current password', class:'' });

	const onInputChange = (ev) => {
		setPassw({ ...passw, [ev.currentTarget.name]: ev.currentTarget.value })
		if(!currPass.ok){
			setCurrPass( { ok: true, title:'Current Password', class:'' });
		}	
	};

	const submit = () => {
		postJsonRequest({
			auToken,
			request: {
				phpFunction: "changePassword",
				userId,
				userName,
				userEMail,
				userRole,
				oldPassword: passw.currPassw,
				newPassword: passw.newPasswA
			},
			callBack: (lub) => { 
				if(!lub.OK){
					setCurrPass( { ok: false, title: 'Current Password is Incorrect!', class:'currPasError' });
				}else{
					setCurrPass( { ok: true, title:'Current Password', class:'' });
					cancel("");
					alert('Password has been changed!')
				}
				curpassEl.current.focus();
			}
		})
	};

	const cancel = () => {
		setPassw({currPassw:'',newPasswA:'',newPasswB:''});
		setCurrPass( { ok: true, title:'Current Password', class:'' });
	}

 	useEffect(() => {
		if(passw.newPasswA!=='' && passw.newPasswA!==passw.newPasswB)
			setNomatch('noMatch');
		else 
			setNomatch('');			
		return () => {
			setNomatch('');
		};
	}, [passw.newPasswA,passw.newPasswB]);

	useEffect(() => {
		if(!nomatch && passw.currPassw!=='' && passw.newPasswA.length > 5 )
			setCanFly(true);
		else
			setCanFly(false);	
		return () => {
			setCanFly(false);
		}	
	}, [nomatch,passw.currPassw,passw.newPasswA]);

	return(
		<form className='page' >
			<div className='inputBox'>
				<div className="boxTitle">
					Change password
					<Icon path={ okce ? mdiEyeOutline : mdiEyeOffOutline } className={"passChangeIcon"} onClick={() => setOkce(!okce)}/>
				</div>
				<div className={"inputLabel"}>
				{currPass.title}
				<input className={"passw "+currPass.class} ref={curpassEl} type={ okce ? "text":"password"} name="currPassw" placeholder="Current Password" onChange={onInputChange} value={passw.currPassw || ''} />
			</div>
			<div className={"inputLabel"}>
				New password
				<input className={"passw "+nomatch} type={okce ? "text" : "password"} name="newPasswA" placeholder="New password" onChange={onInputChange} value={passw.newPasswA || ''} />
			</div>	
			<div className={"inputLabel"}>
				Confirm new password
				<input className={"passw "+nomatch} type={okce ? "text" : "password"} name="newPasswB" placeholder="New password" onChange={onInputChange} value={passw.newPasswB || ''} />
			</div>
			{ canFly && 
				<div className="bottomLine">
					<div className="subButton submit" onClick={() => submit()}>Submit</div>
					<div className="subButton cancel" onClick={() => cancel()}>Cancel</div>
				</div>
			}
			{/* <ReactJson src={ret} /> */}
			</div>
		</form>
	);
}

export default PasswChange;