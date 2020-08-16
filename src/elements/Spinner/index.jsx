import React from "react";
import './style.scss';
import { spinnerColor } from '../../styles/App.scss'; //this is for using theme color from Bulma theme

import { ReactComponent as Spin } from  "./bacteria-solid.svg";
// clean finaly
const Spinner = (props) => {

	if (props.spinning)
    return (
      <div>
        <Spin className="spinner_rp-23423er1" fill={spinnerColor} />
      </div>
    );
  return null; 
};

export default Spinner;
