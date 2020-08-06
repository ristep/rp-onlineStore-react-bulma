import React, { useEffect, useState, useMemo, useRef } from "react";
import { submitJsonQuery, updateDataRow } from "redux/actions";
import { useDispatch } from "react-redux";
// import ReactJson from "react-json-view";
import { useUsersAll, useAuToken } from "redux/selectorHooks";
// import { getTouchedArr } from "redux/selectors";

import { postJsonRequest } from "dataModules";
import ReactJson from "react-json-view";
import Loader from "elements/Loader";
// import ReactJson from "react-json-view";
// import { unstable_renderSubtreeIntoContainer } from "react-dom";

const emptyQuery = {
  sqlStatement: "update",
  table: "users",
  data: {},
  keyData: {},
};

const UsersTable = () => {
  const dispatch = useDispatch();
  const auToken = useAuToken();
  const usersAll = useUsersAll(); //optained data from server
  
  const inputEl = useRef(null);
  // const [result, setResult] = useState({});
  const [updQuery, setUpdQuery] = useState(emptyQuery);
  const [localData, setLocalData] = useState();
  const [clicked, setClicked] = useState(undefined);
  // const [refresh, setRefresh] = useState(0);
  const [hovered, setHoverd] = useState(undefined);
  const [touchedArr, setTouchedArr] = useState([]);

  const changed = (field) =>
    (touchedArr ? touchedArr.includes(field) : false) ? " touched" : "";

  useEffect(() => {
    dispatch(
      submitJsonQuery({
        dataSet: "usersAll",
        jsonQuery: {
          sqlStatement: "select",
          table: "users",
          fields: [
            "id",
            "name",
            "first_name",
            "second_name",
            "email",
            "role",
            "address",
            "place",
            "state",
          ],
          order: "name"
        },
      })
    );
    setClicked({ ...clicked, list: [...usersAll.data.map(() => false)] });
	  //eslint-disable-next-line 
}, []);

  useMemo(() => {
    if(clicked !== undefined)
      if( clicked >= 0 ){
        document.title = usersAll.data[clicked].name;  
        if(inputEl.current)
          inputEl.current.focus();
        // console.log(inputEl.current);
      }       
      //eslint-disable-next-line 
  }, [clicked]);

  const onClickHandle = (i) => {
    // ev.preventDefault();
    setLocalData(usersAll.data[i]);
    setTouchedArr([]);
    setUpdQuery(emptyQuery);
    setClicked( i );
  };

  const onInputChange = (ev) => {
    setLocalData({
      ...localData,
      [ev.currentTarget.name]: ev.currentTarget.value,
    });
    setTouchedArr([ev.currentTarget.name, ...touchedArr.filter(f => f !== ev.currentTarget.name)]);
    setUpdQuery({
      ...updQuery,
      data: {
        ...updQuery.data,
        [ev.currentTarget.name]: ev.currentTarget.value,
      },
      keyData: { id: localData.id },
    });
  };

  const touched = () => {
    return touchedArr && touchedArr.length > 0;
  };

  const submit = () => {
      postJsonRequest({
        auToken: auToken,
        request: updQuery,
        callBack: (udat) => {
          // setResult(udat);
          if (udat.OK) {
            setTouchedArr([]);
            dispatch(
              updateDataRow({
                dataSet: "usersAll",
                index: clicked,
                dataRow: localData,
              })
            );
          }
        },
      });
      setUpdQuery(emptyQuery);
  };

  const cancel = () => {
    setLocalData(usersAll.data[clicked]);
    setTouchedArr([]);
    setUpdQuery(emptyQuery);
  };

  return (
    <div className="page box">
      <div className="table-container">
        <div className="table">
          <div className="title">Users table </div>
          <p className="subtitle">Just an experiment, doesn't need to be visible!</p>
          <table className="table">
            <thead className="thead">
              <tr>
                <th>ID</th>
                <th>User Name</th>
                <th>First Name</th>
                <th>Second Name</th>
                <th>e-Mail</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {[usersAll.data.map((row, i) => {
                  return (
                    <tr
                      key={row.id}
                      name={"albo" + i}
                      className={
                        (clicked===i ? "clicked" : "") +
                        " " +
                        (hovered===i ? "hovered" : "")
                      }
                      onClick={() => onClickHandle(i)}
                      onMouseOver={() => setHoverd(i)}
                      onMouseLeave={() => setHoverd(undefined)}
                    >
                      <td>{row.id}</td>
                      <td>{row.name}</td>
                      <td>{row.first_name}</td>
                      <td>{row.second_name}</td>
                      <td>{row.email}</td>
                      <td>{row.role}</td>
                    </tr>
                  );
                }),
              ]}
            </tbody>
          </table>
          {clicked!==undefined && <p>Click on user for deatails =&gt; { (hovered || hovered===0) ? usersAll.data[hovered].name : ''}</p>}
          {clicked>=0 && localData && (
            <div className="box" style={{ padding: "16px" }}>
              <form className="form usersDetail">
                <div className="columns">
                  <div className="column">
                    <div className="field">
                      <label className={"label" + changed("name")}>
                        User Name
                      </label>
                      <input
                        className="input"
                        type="text"
                        name="name"
                        placeholder="userName"
                        onChange={onInputChange}
                        value={localData.name || ""}
                      />
                    </div>
                    <div className="field">
                      <div>
                        <label className={"label" + changed("first_name")}>
                          First name
                        </label>
                        <input
                          ref={inputEl}
                          className="input"
                          type="text"
                          name="first_name"
                          placeholder="First name"
                          onChange={onInputChange}
                          value={localData.first_name || ""}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div>
                        <label className={"label" + changed("second_name")}>
                          Second name
                        </label>
                        <input
                          className="input"
                          type="text"
                          name="second_name"
                          placeholder="Second name"
                          onChange={onInputChange}
                          value={localData.second_name || ""}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="field">
                      <div>
                        <label className={"label" + changed("email")}>
                          e-mail
                        </label>
                        <input
                          className="input"
                          type="text"
                          name="email"
                          placeholder="e-Mail"
                          onChange={onInputChange}
                          value={localData.email || ""}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div>
                        <label className={"label" + changed("address")}>
                          Address
                        </label>
                        <input
                          className="input"
                          type="text"
                          name="address"
                          placeholder="Address"
                          onChange={onInputChange}
                          value={localData.address || ""}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div>
                        <label className={"label" + changed("place")}>
                          Place
                        </label>
                        <input
                          className="input"
                          type="text"
                          name="place"
                          placeholder="Place"
                          onChange={onInputChange}
                          value={localData.place || ""}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {touched() && (
                  <div className="buttons is-right">
                    <div className="button is-rounded" onClick={() => cancel()}>
                      Cancel
                    </div>
                    <div
                      className="button is-rounded is-link"
                      onClick={() => submit()}
                    >
                      Submit
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}
          {/* <ReactJson src={localData} />  */}
        </div>
        <ReactJson name="touchedArr" src={touchedArr} />
        <ReactJson name="updQuery" src={updQuery} />
      </div>
    </div>
  );
};

export default UsersTable;
