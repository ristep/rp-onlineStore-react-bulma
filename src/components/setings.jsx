import React from 'react';
//import ReactJson from 'react-json-view';
import { useDispatch, useSelector } from "react-redux";
import { closeSettingsDialog } from '../redux/actions';
import TopBanner from 'elements/topBanner';
import BottomBanner from 'elements/bottomBanner';
import BodyBanner from 'elements/bodyBanner';
import Button from 'elements/button';
import PopupModal from 'elements/popupModal';
import { getSettingsDialogState } from 'redux/selectors';

const Seting = () => {
	const dispatch = useDispatch();
	const settingsDialog = useSelector(getSettingsDialogState);

	return ( 
		<PopupModal showModal={settingsDialog}>
			<TopBanner>
					Setings dialog!
					</TopBanner>
			<BodyBanner>
				<br />
				<br />
			</BodyBanner>
			<BottomBanner>
				<Button onClick={() => dispatch(closeSettingsDialog())} red >Close</Button>
			</BottomBanner>
		</PopupModal>
	);
}

export default Seting;