import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateDataField,
  cancelUpdates,
  executeDataAction,
  prepareDataAction,
  navigateToUrl,
} from "redux/actions";
import {
  getUserData,
  getUserDataTouched,
  getTouchedArr,
} from "redux/selectors";
// import ReactJson from 'react-json-view';
import { useCallback } from "react";
import { useUserToken } from "redux/selectorHooks";
import { mdiLockReset } from "@mdi/js";
// import NavLink from 'elements/navLink';

const UserData = () => {
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
      <div className="box-cc">
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
              <div className="field">
                <label className={"label" + changed("name")}>User Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="name"
                    placeholder="userName"
                    onChange={onInputChange}
                    value={data.name || ""}
                  />
                </div>
              </div>

              <div className={"field" + changed("first_name")}>
                <label className="label">First name</label>
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
                <label className="label">Second name</label>
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
                <label className="label">e-mail</label>
                <input
                  className="input"
                  type="text"
                  name="email"
                  placeholder="e-Mail"
                  onChange={onInputChange}
                  value={data.email || ""}
                />
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
								<div className="button is-rounded is-link" onClick={() => submit()}>
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
