import React from "react";

function Subheader() {
  return (
    <div className="flex align-items-center space-between">
      <div className="flex align-items-center">
        <div className="ml-5">
          <i class="fa fa-briefcase ml-5"></i>
        </div>
        <p className="ml-2"> Jobs</p>
        <p className="ml-3">&#10095;</p>
        <p className="ml-3"> Full Stack Developer</p>
        <button className="ml-2 secondary-button">View Job Details</button>
      </div>
      <div className="flex align-items-center position-relative">
        <div className="ml-3">
          <button className="secondary-button bigger">Add Candidate</button>
          <button className="secondary-button bigger bl-0">
            <i class="fa fa-angle-down"></i>
          </button>
        </div>
        <div className="ml-3">
          <button className="primary-button">
            <i className="fa fa-globe mr-1"></i> Published{" "}
            <i class="fa fa-angle-down ml-2 f-8"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Subheader;
