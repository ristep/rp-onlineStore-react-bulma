import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from "email-validator";
import {
  updateDataField,
  cancelUpdates,
  executeDataAction,
  prepareDataAction,
} from "redux/actions";
import {
  getUserData,
  getUserDataTouched,
  getTouchedArr,
} from "redux/selectors";
// import ReactJson from 'react-json-view';
import { useCallback } from "react";
import { useUserToken } from "redux/selectorHooks";
// import NavLink from 'elements/navLink';

const UserData = () => {
  const [emailOK, setEmailOK] = useState(true);
  const [userOK, setUserOK] = useState(true);
  const dispatch = useDispatch();
  const data = useSelector(getUserData);
  const touched = useSelector(getUserDataTouched);
  const touchedArr = useSelector(getTouchedArr);
  const tokenData = useUserToken().tokenData;
  const changed = (field) =>
    (touchedArr ? touchedArr.includes(field) : false) ? " touched" : "";

  const reLoad = useCallback(() => {
    dispatch(
      prepareDataAction({
        dataSet: "userData",
        dataAction: "fetch",
        keyData: { id: tokenData.id },
      })
    );
    dispatch(executeDataAction("userData"));
  }, [dispatch, tokenData]);

  useEffect(() => {
    reLoad();
    return () => {
      console.log("CleanUp");
    };
  }, [dispatch, reLoad, tokenData]);

  const cancel = () => {
    dispatch(cancelUpdates("userData"));
  };

  const submit = () => {
    dispatch(prepareDataAction({ dataSet: "userData", dataAction: "submit" }));
    dispatch(executeDataAction("userData"));
  };

  useEffect(() => {
    setEmailOK(validator.validate(data.email));
  }, [data.email]);

  useEffect(() => {
    setUserOK(data.name.length > 3);
  }, [data.name]);

  const onInputChange = (ev) => {
    dispatch(
      updateDataField({
        dataSet: "userData",
        field: ev.currentTarget.name,
        value: ev.currentTarget.value,
      })
    );
  };

  const lockClick = () => {
    window.location.href = "#/passwChange";
    //dispatch(navigateToUrl('passChange'));
  };

  if (data)
    return (
      <div className="page box">
        <div className="title">
          User Data
          <span class="icon has-text-danger is-large">
            <i
              className="fas fa-unlock-alt"
              align="right"
              onClick={lockClick}
            ></i>
          </span>
        </div>
        <form>
          <div className="columns">
            <div className="column">
              <div className={"field" + changed("name")}>
                <label className="label">Username</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className={"input " + (userOK ? "is-success" : "is-danger")}
                    name="name"
                    type="text"
                    placeholder="username"
                    onChange={onInputChange}
                    value={data.name}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                  </span>
                  {!userOK ? (
                    <>
                      <span className="icon is-small is-right">
                        <i className="fas fa-times"></i>
                      </span>
                      <p className="help is-danger">
                        This username is not valid
                      </p>
                    </>
                  ) : (
                    <>
                      <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className={"field" + changed("first_name")}>
                <label className="label">Firstname</label>
                <input
                  className="input"
                  type="text"
                  name="first_name"
                  placeholder="First name"
                  onChange={onInputChange}
                  value={data.first_name || ""}
                />
              </div>

              <div className={"field" + changed("second_name")}>
                <label className="label">Secondname</label>
                <input
                  className="input"
                  type="text"
                  name="second_name"
                  placeholder="Second name"
                  onChange={onInputChange}
                  value={data.second_name || ""}
                />
              </div>
            </div>
            <div className="column">
              <div className={"field" + changed("email")}>
                <label className="label">Email</label>
                <div class="control has-icons-left has-icons-right">
                  <input
                    className={
                      "input " + (emailOK ? "is-success" : "is-danger")
                    }
                    type="text"
                    name="email"
                    placeholder="Email input"
                    onChange={onInputChange}
                    value={data.email || ""}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                  {!emailOK && (
                    <>
                      <span className="icon is-small is-right">
                        <i className="fas fa-exclamation-triangle"></i>
                      </span>
                      <p className="help is-danger">This email is invalid</p>
                    </>
                  )}
                </div>
              </div>

              <div className={"field" + changed("address")}>
                <label className="label">Address</label>
                <input
                  className="input"
                  type="text"
                  name="address"
                  placeholder="Address"
                  onChange={onInputChange}
                  value={data.address || ""}
                />
              </div>

              <div className={"field" + changed("place")}>
                <label className="label">Place</label>
                <input
                  className={"input"}
                  type="text"
                  name="place"
                  placeholder="Place"
                  onChange={onInputChange}
                  value={data.place || ""}
                />
              </div>
            </div>
          </div>
          <div>
            {touched && (
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
            {/* <ReactJson src={data} /> */}
          </div>
        </form>
      </div>
    );
  else return <div></div>;
};

export default UserData;
