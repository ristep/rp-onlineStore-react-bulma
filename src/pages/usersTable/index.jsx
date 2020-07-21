import React, { useEffect, useState } from 'react';
import { submitJsonQuery, updateDataField, updateDataRow } from 'redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import ReactJson from 'react-json-view';
import { useUsersAll, useAuToken } from 'redux/selectorHooks';
import { getTouchedArr } from 'redux/selectors';

import { postJsonRequest } from 'dataModules';

const UsersTable = () => {
	const dispatch = useDispatch();
	const auToken = useAuToken();
	const usersAll = useUsersAll(); //optained data from server
	
	const [result, setResult] = useState({}); 
	const [updQuery, setUpdQuery] = useState({sqlStatement:'update',table:'users', data:{}, keyData:{}})
	const [localData, setLocalData ] = useState(); 
	const [clicked, setClicked] = useState({ curr: false, list:[] });
	// const [refresh, setRefresh] = useState(0);

	const [hovered, setHoverd] = useState({ curr: false, list:[] });
	const [touchedArr, setTouchedArr] = useState([]);
	
	const changed = (field) => ((touchedArr ?  touchedArr.includes(field): false) ? " touched": ""	); 
	
	useEffect(() => {
		dispatch(submitJsonQuery({	
			dataSet: 'usersAll',
			jsonQuery:{
				sqlStatement: "select",
				table: "users",
				fields: ["id", "name", "first_name", "second_name", "email", 
								 "role", "address", "place", "state" ]
			}
		}));
	}, [dispatch]);

	useEffect(() => {
		setClicked({ ...clicked, list:[...usersAll.data.map(() =>(false))] });
	},[usersAll]);

	const onClickHandle = (i, ev) => {
		ev.preventDefault();
		const clk = [...usersAll.data.map(() =>(false))]; // clicked;
		clk[i] = !clicked.list[i];
		setLocalData(usersAll.data[i]);
		setTouchedArr([]);
		setClicked({ curr: clk[i] ? i : false, list:clk });
	};

	const hoverRow = (i) => {
		const clk = [...usersAll.data.map(() =>(false))]; // hovered;
		clk[i] = true;
		setHoverd({ curr: clk[i] ? i : false, list:clk });
	};

	const leaveRow = (i) => {
		setHoverd({ curr: false, list:[] });
	};

	const onInputChange = (ev) => {
		setLocalData({ ...localData, [ev.currentTarget.name]:ev.currentTarget.value });
		setTouchedArr( [...touchedArr, ev.currentTarget.name]);
		setUpdQuery({ ...updQuery, data:{ ...updQuery.data, [ev.currentTarget.name]:ev.currentTarget.value}, keyData:{ id:localData.id } });
	};

	const touched = () => {
		return (touchedArr && touchedArr.length>0);
	};

	const submit = () => {
		postJsonRequest({
		 	auToken: auToken,
		 	request: updQuery,
		 	callBack: (udat) => { 
				setResult( udat ); 
				if( udat.OK ){
					setTouchedArr([]);
					dispatch(updateDataRow({ dataSet:'usersAll', index:clicked.curr, dataRow:localData } ))	
				}	
			}
		})
	};

	const cancel = () => {
		setLocalData(usersAll.data[clicked.curr]);
		setTouchedArr([]);
	};

	return (
		<div className='tablePage' >
			<div className='tableBox'>
				<div className="tableTitle">Users table </div>
				<table className="redTable">
					<thead>
						<tr>
							<th>ID</th>
							<th>User Name</th>
							<th>First Name</th>
							<th>Second Name</th>
							{/* <th>e-Mail</th> */}
						</tr>
					</thead>
					<tbody>
						{[...usersAll.data.map((row,i) => {
							return(
							<tr key={i} 
									name={'albo'+i} 
									className={ (clicked.list[i]?'clicked':'') + ' ' + (hovered.list[i]?'hovered':'') } 
									onClick={(ev) => onClickHandle(row.id,ev)} 
									onMouseOver={() => hoverRow(row.id)}
									onMouseLeave={() => leaveRow(row.id)}
							>
								<td>{row.id}</td>
								<td>{row.name}</td>
								<td>{row.first_name}</td>
								<td>{row.second_name}</td>
								{/* <td>{row.email}</td> */}
							</tr>
						)})]}
					</tbody>
				</table>
				{/* {clicked.curr===false && <p>Click on user for deatails => { hovered.curr ? usersAll.data[hovered.curr].name : ''}</p>} */}
				{clicked.curr && 
						<form className='usersDetail' >
						<div className={"inputLabel" + changed("name")}>
							User Name
							<input type="text" name="name" placeholder="userName" onChange={onInputChange} value={localData.name || ''} />
						</div>
						<div className={"inputLabel" + changed("first_name")}>
							First name
							<input type="text" name="first_name" placeholder="First name" onChange={onInputChange} value={localData.first_name || ''} />
						</div>
						<div className={"inputLabel" + changed("second_name")}>
							Second name
							<input type="text" name="second_name" placeholder="Second name" onChange={onInputChange} value={localData.second_name || ''} />
						</div>
						<div className={"inputLabel" + changed("email")}>
							e-mail
							<input type="text" name="email" placeholder="e-Mail" onChange={onInputChange} value={localData.email || ''} />
						</div>	
						<div className={"inputLabel" + changed("address")}>
							Address
							<input type="text" name="address" placeholder="Address" onChange={onInputChange} value={localData.address || ''} />
						</div>	
						<div className={"inputLabel" + changed("place")}>
							Place
							<input type="text" name="place" placeholder="Place" onChange={onInputChange} value={localData.place || ''} />
						</div>	
						{ touched() && 
							<div className="bottomLine">
								<div className="subButton submit" onClick={() => submit()}>Submit</div>
								<div className="subButton cancel" onClick={() => cancel()}>Cancel</div>
							</div>
						}
					</form>
				}
				{/* <ReactJson src={result} />  */}
			</div>
			{/* <ReactJson src={updQuery} /> */}
		</div>
	);
}

export default UsersTable;