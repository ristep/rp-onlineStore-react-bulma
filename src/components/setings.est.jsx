import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import SettingsDialog from './setings';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(
		<Provider store={store}>
			<SettingsDialog />
		</Provider>, div);
	ReactDOM.unmountComponentAtNode(div);
});
