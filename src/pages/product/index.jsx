import React, { useEffect, useCallback } from "react";
import ReactJson from "react-json-view";
import { useDispatch, useSelector } from "react-redux";
import { prepareDataAction, executeDataAction } from "redux/actions";
import { getFoodDetail, getNaviParams, getIsFetching, getLoadingClass } from "redux/selectors";
import { imgUrl } from "dataModules";

const ProductPage = () => {
  const dispatch = useDispatch();
  const params = useSelector(getNaviParams);
  const data = useSelector(getFoodDetail);
//  const variant = params[1];
  const dataFetching = useSelector(getIsFetching);
  const loadingClass =  useSelector(getLoadingClass);
  
  const reLoad = useCallback(() => {
    dispatch(
      prepareDataAction({
        dataSet: "foodDetail",
        dataAction: "fetch",
        keyData: { id: params[0] },
      })
    );
    dispatch(executeDataAction("foodDetail"));
  }, [dispatch, params]);

  useEffect(() => {
    reLoad();
  }, [dispatch, reLoad]);

  if ( data !== undefined )
    return (
      <div className={"page "+loadingClass}>
        <div className={"card "+loadingClass}>
          <header class="card-header">
            <h1 class="card-header-title">{data.title}</h1>
          </header>
          <div className="card-image">
            <figure className="image is-fullwidth">
              <img src={imgUrl + data.imgFileName} alt="" />
            </figure>
          </div>
          <div className="card-content">
            <div className="content">{data.description}</div>
          </div>
          <div className="buttons is-right">
            <button className="button is-rounded is-primary">Save</button>
            <button className="button is-rounded is-primary">Edit</button>
            <button
              className="button is-rounded is-primary"
              onClick={() => window.history.go(-1)}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  else return(
    <div className="page">
      <div className="card">
          Loading {dataFetching}
      </div>
    </div>
  );
};

export default ProductPage;
