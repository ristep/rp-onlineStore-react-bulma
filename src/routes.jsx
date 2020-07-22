import React from "react";
import { useSelector } from "react-redux";
import HomePage from "pages/home";
import ProductsPage from "pages/pruducts";
import PageNotFound from "pages/notFound";
import SetingsPage from "pages/setings";
import ProductPage from "pages/product";
import UserData from "pages/userData";
import { getPage } from "redux/selectors";
import LoginForm from "pages/login";
import PasswChange from "pages/passwChange";
import UsersTable from "pages/usersTable";
import AboutPage from "pages/about";

export const routes = {
	home: <HomePage />,
	products: <ProductsPage />,
	product: <ProductPage />, //({id,variant}) => <ProductPage id={id} variant={variant} />,
	setings: <SetingsPage />,
	user: <UserData />,
	login: <LoginForm />,
	userData: <UserData />,
	usersTable: <UsersTable />,
	users: <UsersTable />,
	passwChange: <PasswChange />,
	about: <AboutPage />,
	errPage: <PageNotFound />,
};

export const NaviGator = () => {
	const comp = useSelector(getPage);
	return(	routes[comp] );
}

export const validPages = Object.keys(routes);
export const errPage = 'errPage'; 
export const homePage = 'home';