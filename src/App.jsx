import React, { useEffect, useState, useMemo } from "react";
import "./App.scss";
import AppNavBar from "components/appNavbar";

import { useDispatch } from "react-redux";
import { navigateToUrl, fetchToken } from "redux/actions";
import { useIsLoggedIn } from "redux/selectorHooks";
import { NaviGator } from "routes";
import SideCart from "components/sideCart";
import { useCardBoxOpen } from 'redux/selectorHooks';

// import { getCartBoxState } from "redux/selectors";
// import { UserText } from "components/userText";

function App() {
  const dispatch = useDispatch();
  const lioggedIn = useIsLoggedIn();
  const cartBox =  useCardBoxOpen();
  const [ dinaClass, setDinaClass] = useState("column is-8")

  useEffect(() => {
    dispatch(navigateToUrl(window.location.hash));
    window.onhashchange = () => dispatch(navigateToUrl(window.location.hash));
    // voa dodeka ne se stokme UserManagmentot
    if (!lioggedIn)
      dispatch(fetchToken({ userName: "anonymous", password: "anonymous" }));
  });

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
    </div>
  );
}

export default App;

// Garbage colector

    /* <footer className="footko ">
        <div className="content has-text-centered">
          <p>
            <strong>Bulma</strong> by{" "}
            <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is
            licensed
            <a href="http://opensource.org/licenses/mit-license.php"> MIT</a>.
            The website content is licensed{" "}
            <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
              CC BY NC SA 4.0
            </a>
            .
          </p>
        </div>
      </footer> */

//<CartBox />

//<div className="columns is-desktop is-gapless">
//<div className="column is-one-fifth"></div>
//<div className="column is-three-fifths">

// import { HashRouter as Router,  Route,  Link } from "react-router-dom";
// import { renderRoutes, } from "react-router-config";

// useEffect( () => {
// 	dispatch(navigateToUrl(window.location.hash));
// }, []);

// useEffect(() => {
// 	onTokenClick();
// 	setTimeout(function(){
// 		onClickSelectFoods();
// 	}, 1000);
// },[]);

// const routes = {
// 	home: <HomePage />,
// 	products: <ProductsPage />,
// 	product: <ProductPage />, //({id,variant}) => <ProductPage id={id} variant={variant} />,
// 	setings: <SetingsPage />,
// 	user: <UserData />,
// };

// const Navigate = () => {
// 	const comp = useSelector(getPage);
// 	console.log(routes[comp]);
// 	return(	routes[comp] );
// }

// const Root = ({ route }) => (
//   <div>
//     <h1>Root</h1>
//     {/* child routes won't render without this */}
//     {renderRoutes(route.routes)}
//   </div>
// );

// const routes = [
//   {
//     component: Root,
//     routes: [
//       {
//         path: "/",
//         exact: true,
//         component: HomePage
//       },
//       {
//         path: "/product/:id",
//         component: ProductPage,
// 			},
// 			{
// 				path: "/produkts",
// 				commponent: ProductsPage,
// 			},
// 			{
// 				path: "/setings",
// 				commponent: SetingsPage,
// 			},
// 			{
// 				path: "/user",
// 				commponent: UserData,
// 			}
//     ]
//   }
// ];
