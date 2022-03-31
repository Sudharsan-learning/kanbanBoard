import React from "react";

function Sidebar() {
  return (
    <>
      <div className="flex flex-column align-items-center space-between h-100">
        <div className="text-center">
          <i className="logo-icon-parent">
            <img src="./logo.png" className="logo-icon icon" />
          </i>
          <div className="m-2 mt-3">
            <i class="fa fa-gauge f-icon "></i>
          </div>
          <div className="m-2 mt-3">
            <i class="fa fa-inbox f-icon "></i>
          </div>
          <div className="m-2 mt-3">
            <i class="fa fa-briefcase f-icon "></i>
          </div>
          <div className="m-2 mt-3">
            <i class="fa fa-user-group f-icon "></i>
          </div>
          <div className="m-2 mt-3">
            <i class="fa fa-file f-icon "></i>
          </div>
          <div className="m-2 mt-3">
            <i class="fa fa-gear f-icon "></i>
          </div>
        </div>
        <div className="text-center">
          <div className="m-2 mt-3">
            <i class="fa fa-circle-question f-icon "></i>
          </div>
          <div className="m-2 mt-3">
            <i class="fa fa-message f-icon "></i>
          </div>
          <div className="m-2 mt-3">
            <i class="fa fa-message f-icon "></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
