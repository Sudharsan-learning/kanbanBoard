import React, { useState } from "react";
import data from "../data.json";

function Popup({ visible, setVisible }) {
  const [filterValue, setFilterValue] = useState();

  const getValue = (e) => {
    const columnData = data.filter((datas) => datas.name.first == e.target.value);
    console.log("column", columnData);
    setFilterValue(columnData);
  };

  console.log("filterValue", filterValue);
  return (
    <>
      <div className={`exit-intent-popup ${visible ? "popup-visible" : ""}`}>
        <div className="popup">
        <div className="positon-absolute-position-popup-close" onClick={()=> setVisible(false)}><button className="primary-button">Close</button></div>
          <section className="popup-container">
            <div>
              <input
                type="search"
                className="input-search-popup form-control"
                placeholder="Search candidate by name"
                onChange={getValue}
              />
              <i className="fa fa-search positon-absolute-position-popup"></i>
            </div>
            <br />
            {filterValue &&
              filterValue.map((item) => (
                <div className="seperate-candidate mt-5">
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
              ))}
          </section>
        </div>
      </div>
    </>
  );
}

export default Popup;
