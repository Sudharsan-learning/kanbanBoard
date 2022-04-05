import React from "react";

function Listitem({ item }) {
  return (
    <div className="seperate-candidate">
      <div className="applicant-info position-relative">
        <p>
          {item.name.title}
          {"."} {item.name.first}
        </p>
        <span>Frontend Developer</span>
      </div>
      <div className="applicant-quick-info">
        <div>
          <i className="fa-regular fa-star"></i>
          <i className="fa-regular fa-star"></i>
          <i className="fa-regular fa-star"></i>
          <i className="fa-regular fa-star"></i>
          <i className="fa-regular fa-star"></i>
        </div>
        <div>
          <i className="fa fa-ellipsis-vertical"></i>
        </div>
      </div>
    </div>
  );
}

export default Listitem;
