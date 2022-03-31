import React from "react";

function Listitem({item}) {
  return (
    
      <div className="seperate-candidate">
        <div className="applicant-info">
          <p>
            {item.name.title}
            {"."} {item.name.first}
          </p>
          <span>Frontend Developer</span>
        </div>
        <div className="applicant-quick-info">
          <div>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
          </div>
          <div>
            <i class="fa fa-ellipsis-vertical"></i>
          </div>
        </div>
      </div>
    
  );
}

export default Listitem;
