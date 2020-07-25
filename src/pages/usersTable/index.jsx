import React, { useEffect, useState } from "react";
import { submitJsonQuery, updateDataRow } from "redux/actions";
import { useDispatch } from "react-redux";
// import ReactJson from "react-json-view";
import { useUsersAll, useAuToken } from "redux/selectorHooks";
// import { getTouchedArr } from "redux/selectors";

import { postJsonRequest } from "dataModules";

const UsersTable = () => {
  const dispatch = useDispatch();
  const auToken = useAuToken();
  const usersAll = useUsersAll(); //optained data from server

  // const [result, setResult] = useState({});
  const [updQuery, setUpdQuery] = useState({
    sqlStatement: "update",
    table: "users",
    data: {},
    keyData: {},
  });
  const [localData, setLocalData] = useState();
  const [clicked, setClicked] = useState({ curr: false, list: [] });
  // const [refresh, setRefresh] = useState(0);

  const [hovered, setHoverd] = useState({ curr: false, list: [] });
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
        },
      })
    );
  }, [dispatch]);

  useEffect(() => {
		setClicked({ ...clicked, list: [...usersAll.data.map(() => false)] });
		// eslint-disable-next-line 
  }, [clicked]);

  const onClickHandle = (i, ev) => {
    ev.preventDefault();
    const clk = [...usersAll.data.map(() => false)]; // clicked;
    clk[i] = !clicked.list[i];
    setLocalData(usersAll.data[i]);
    setTouchedArr([]);
    setClicked({ curr: clk[i] ? i : false, list: clk });
  };

  const hoverRow = (i) => {
    const clk = [...usersAll.data.map(() => false)]; // hovered;
    clk[i] = true;
    setHoverd({ curr: clk[i] ? i : false, list: clk });
  };

  const leaveRow = (i) => {
    setHoverd({ curr: false, list: [] });
  };

  const onInputChange = (ev) => {
    setLocalData({
      ...localData,
      [ev.currentTarget.name]: ev.currentTarget.value,
    });
    setTouchedArr([...touchedArr, ev.currentTarget.name]);
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
              index: clicked.curr,
              dataRow: localData,
            })
          );
        }
      },
    });
  };

  const cancel = () => {
    setLocalData(usersAll.data[clicked.curr]);
    setTouchedArr([]);
  };

  return (
    <div className="page box">
      <div className="table-container">
        <div className="table">
          <div className="title">Users table </div>
          <table className="redTable">
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
            <tbody>
              {[
                ...usersAll.data.map((row, i) => {
                  return (
                    <tr
                      key={row.id}
                      name={"albo" + i}
                      className={
                        (clicked.list[i] ? "clicked" : "") +
                        " " +
                        (hovered.list[i] ? "hovered" : "")
                      }
                      onClick={(ev) => onClickHandle(i, ev)}
                      onMouseOver={() => hoverRow(i)}
                      onMouseLeave={() => leaveRow(i)}
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
          {/* {clicked.curr===false && <p>Click on user for deatails => { hovered.curr ? usersAll.data[hovered.curr].name : ''}</p>} */}
          {clicked.curr && localData && (
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
                      <div className={"inputLabel" + changed("first_name")}>
                        <label className={"label" + changed("name")}>
                          First name
                        </label>
                        <input
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
                      <div className={"inputLabel" + changed("second_name")}>
                        <label className={"label" + changed("name")}>
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
                      <div className={"inputLabel" + changed("email")}>
                        <label className={"label" + changed("name")}>
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
                      <div className={"inputLabel" + changed("address")}>
                        <label className={"label" + changed("name")}>
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
                      <div className={"inputLabel" + changed("place")}>
                        <label className={"label" + changed("name")}>
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
        {/* <ReactJson src={updQuery} /> */}
      </div>
    </div>
  );
};

export default UsersTable;
