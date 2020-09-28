import axios from "axios";

const axParams = {
	baseURL: "http://192.168.100.8/SimpJ2J/",
	headers: {
		"Authorization": "dummy-key",
		"Content-type": "application/json"
	}
};

const Axios = axios.create(axParams);

export const getToken = (args) => {
	const { url = 'tokenizer/', userName, password, callBack, callError } = args;
	const fetchToken = () => {
		Axios.post(url, {
			name: userName,
			password: password
		})
		.then(response => { 
			callBack({ timeStamp: Date.now() ,...response.data});
		})
		.catch(error => {
				callError(error);
		});
	}
	fetchToken();
}
 
export const postJsonRequest = (args) => {
	const { request, auToken, callBack } = args;
	const fetchData = async () => {
		const dtj = await Axios.post("", request, { headers: { Authorization: auToken } }); 
		callBack(dtj.data);
	};
	fetchData();
};

export const imgUrl = axParams.baseURL + 'images/' 
export const slikcaUrl = axParams.baseURL + 'images/slikca' 
