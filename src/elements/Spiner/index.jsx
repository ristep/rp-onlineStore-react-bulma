import React from "react";
import './style.scss';
import { spinerColor } from '../../styles/App.scss'; //this is for using theme color from Bulma theme

import { ReactComponent as Spin } from  "./bacteria-solid.svg";

const Spiner = (props) => {

	if (props.spining)
    return (
      <div>
        <Spin className="spiner_rp-23423er1" fill={spinerColor} />
      </div>
    );
  return null; 
};

export default Spiner;
