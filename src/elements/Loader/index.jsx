import React from "react";
import { useSelector } from "react-redux";
import { getIsFetching } from "redux/selectors";
import { ReactComponent as Rotor } from  "./empire-brands.svg";
// import { ReactComponent as Rotor } from  "./bacteria-solid.svg";

const Loader = () => {
  const dataFetching = useSelector(getIsFetching);

  if (dataFetching)
    return (
      <div>
        <Rotor className="rotor" />
      </div>
    );
  return null; 
};

export default Loader;

// {/* <i class="fas fa-bacteria fa-spin fa-8x "></i> */} 
