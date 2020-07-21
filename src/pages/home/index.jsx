import React from "react";

const HomePage = () => {
  return (
    <>
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              src="https://bulma.io/images/placeholders/1280x960.png"
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img
                  src="https://bulma.io/images/placeholders/96x96.png"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">Home page</p>
              <p className="subtitle is-6">Free food online</p>
            </div>
          </div>

          <div className="content">
            This is only test application, you can't order anything on this site :) 

						<hr />
            <a className="button is-primary" href="#/usersTable">Users Table</a>
            <a className="button is-primary" href="#/login">Login</a>
            <a className="button is-primary" href="#/products">Products for ordering</a>
            <a className="button is-danger" href="https://google.com">google.com</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
