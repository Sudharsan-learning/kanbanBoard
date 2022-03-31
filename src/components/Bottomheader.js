import React from "react";

function Bottomheader() {
  return (
    <>
      <div className="flex align-items-center space-between">
        <div className="flex align-items-center">
          <div className="ml-5">
            <p className="ml-5">
              All candidates - <span> Active (48)</span>
              <i className="fa fa-angle-down f-8 ml-2"></i>
            </p>
          </div>
          <div className="ml-5">
            <p className="ml-5">
             <span className="mr-2">Sort by</span>Last Updated 
              <i className="fa fa-angle-down f-8 ml-2"></i>
            </p>
          </div>
        </div>
        <div className="flex align-items-center">
            <div className="ml-4">
            <i class="fa fa-list"></i>
            </div>
            <div className="ml-4">
            <i class="fa fa-filter"></i>
            </div>
            <div className="ml-4">
            <i class="fa fa-upload"></i>
            </div>
        </div>
      </div>
    </>
  );
}

export default Bottomheader;
