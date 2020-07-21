import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getCartDataSet } from "redux/selectors";
import { useIsLoggedIn, useUserTitles } from "redux/selectorHooks";
import Logo from "elements/logo";

const AppNavBar = (props) => {
  const {children} = props;
  const loginOK = useIsLoggedIn();
  const { amount } = useSelector(getCartDataSet);
  const [menu, setMenu] = useState("");
  const { userName, firstName, secondName } = useUserTitles();

  // const onClickHand = (props) => {
  //   window.location.href = "#/" + props.navRoute;
  // };

  const onBurgerClick = () => {
    if (menu === "") setMenu("is-active");
    else setMenu("");
  };

  const navClickHandle = () => {
    if (menu === "is-active") setMenu("");
  };

  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Logo /><p>{menu}</p>
          <div
            className={"navbar-burger"}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarMain"
            onClick={() => onBurgerClick()}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>

        <div id="navbarMain" className={"navbar-menu " + menu}  onClick={() => navClickHandle()}>
          <div className="navbar-start">
            <a className="navbar-item" href="#/home">Home</a>
            <a className="navbar-item" href="#/products" >Products</a>
            <a className="navbar-item" href="#/cart"> {"Cart: $" + amount.toFixed(2)} </a>
            <a className="navbar-item" href="#/about">About</a>
          </div>

          <div className="navbar-end">
            {loginOK ? (
              <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link">{userName}</div>
                <div className="navbar-dropdown">
                  <p className="title navbar-item">
                    {firstName} {secondName}
                  </p>
                  <a
                    className="navbar-item"
                    label="Settings"
                    href="#/setings"
                  >
                    Settings
                  </a>
                  <a
                    className="navbar-item"
                    label="User"
                    href="#/user"
                  >
                    Profile
                  </a>
                  <hr className="navbar-divider" />
                  <a className="navbar-item" href="#/report">Report an issue</a>
                  <hr className="navbar-divider" />
                  <a  className="navbar-item is-primary is-light" href="#/login">
                    LogOut
                  </a>
                </div>
              </div>
            ) : (
              <div className="navbar-item">
                <a className="navbar-item is-primary is-light" href="#/login" >
                  LogIn
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default AppNavBar;


// code dump
    // switch (url) {
    //   case "about":
    //     dispatch(openAboutDialog());
    //     break;
    //   case "cart":
    //     dispatch(toggleCartBox());
    //     break;
    //   default:
    //     window.location.href = url;
    // }
