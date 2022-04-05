import React from "react";

function Header({ setVisible }) {
  return (
    <>
      <div className=" flex align-items-center space-between">
        <div className="flex align-items-center">
          <i className="navbar-logo ml-5">
            <img src="./logo.png" className="nav-logo-icon" />
          </i>
          <h3 className="brand-font">iamneo.ai Talent Center</h3>
        </div>
        <div className="flex align-items-center position-relative">
          <div onClick={() => setVisible(true)}>
            <input
              type="search"
              className="input-search"
              placeholder="Search"
            />
            <i className="fa fa-search positon-absolute-position"></i>
          </div>
          <div className="ml-3">
            <button className="primary-button">
              <i className="fa fa-plus"></i>Add New
            </button>
          </div>
          <div className="m-2">
            <i className="top-nav-separator"></i>
          </div>
          <div className="position-relative ml-1">
            <i class="fa fa-gift"></i>
            <div className="beamer-icon">1</div>
          </div>
          <div className="avatar-circle ml-3">
            <span className="avatar-icon">S</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
