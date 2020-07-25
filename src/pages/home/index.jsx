import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotoList } from "redux/selectors";
import { fetchPhotoList } from "redux/actions"

const HomePage = () => {
  const [ ndx, setNdx] = useState(1);
  const dispatch = useDispatch();
  const { data } = useSelector(getPhotoList);
  // const foodsAll = useSelector(getFoodsAll); //optained data from server
  
  useEffect(() => {
    dispatch(fetchPhotoList());
    setNdx(5);
	}, [dispatch]);

  return (
    <>
      <div className="card">
        <div className="card-image">
          <figure className="image is-16by9">
            <img src={data[ndx]} alt='' /> 
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            { data[ndx-1] &&
            <div className="media-left">
              <figure className="image is-48x48" onClick={() => setNdx(ndx-1) }>
                <img
                  className="is-rounded"
                  src={data[ndx-1]}
                  alt=""
                />
              </figure>
            </div>
            }  
            <div className="media-content">
              <p className="title is-4">Home page</p>
              <p className="subtitle is-6">Free food online</p>
            </div>
            { data[ndx+1] &&
            <div className="media-right">
              <figure className="image is-48x48" onClick={() => setNdx(ndx+1) }>
                <img
                  className="is-rounded"
                  src={data[ndx+1]}
                  alt=""
                />
              </figure>
            </div>
            }
          </div>

          <div className="content">
            This is only test application, you can't order anything on this site :) 

						<hr />
            <div className='buttons is-centered'>
              <a className="button is-rounded is-primary" href="#/usersTable">Users Table</a>
              <a className="button is-rounded is-primary" href="#/login">Login</a>
              <a className="button is-rounded is-primary" href="#/products">Products for ordering</a>
              <a className="button is-rounded is-danger"  href="https://pan.sman.cloud" target="#">Pan Sman Cloud</a>
            </div>
          </div>
        </div>
      </div>
      {/* <ReactJson src={photoList} /> */}
    </>
  );
};

export default HomePage;
