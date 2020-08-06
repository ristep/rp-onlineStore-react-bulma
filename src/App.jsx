import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles/App.scss";
import AppNavBar from "components/appNavbar";

import { getIsFetching } from "redux/selectors";
import { navigateToUrl, fetchToken } from "redux/actions";
import { useIsLoggedIn } from "redux/selectorHooks";
import { NaviGator } from "routes";
import SideCart from "components/sideCart";
import { useCardBoxOpen } from 'redux/selectorHooks';
import Spiner from "elements/Spiner";

// import { getCartBoxState } from "redux/selectors";
// import { UserText } from "components/userText";

function App() {
  const dispatch = useDispatch();
  const lioggedIn = useIsLoggedIn();
  const cartBox =  useCardBoxOpen();
  const [ dinaClass, setDinaClass] = useState("column is-8");
  const loading = useSelector(getIsFetching); 
  
  useEffect(() => {
    dispatch(navigateToUrl(window.location.hash));
    window.onhashchange = () => dispatch(navigateToUrl(window.location.hash));
    // voa dodeka ne se stokme UserManagmentot
    if (!lioggedIn)
      dispatch(fetchToken({ userName: "anonymous", password: "anonymous" }));
  },[]);

  useMemo(() => {
    if(cartBox)
      setDinaClass("column is-8");
    else
      setDinaClass("column is-12");
  }, [cartBox]);  

  return (
    <div className="container">
      <AppNavBar>
        <div className="topGapo"></div>
        <div className="columns">
          <div className={dinaClass}>
            <NaviGator />
          </div>
          {cartBox &&
            <div className="column">
              <div className="bd-notification">
                <SideCart />
              </div>
            </div>
          }
        </div>
      </AppNavBar>
      <Spiner spining={loading} />
    </div>
  );
}

export default App;