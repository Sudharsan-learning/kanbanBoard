import React, { useState } from "react";
import data from "../data.json";
import Listitem from "./Listitem";

function Popup({ visible, setVisible }) {
  const [filterValue, setFilterValue] = useState();
  const getValue = (e) => {
    const columnData = data.filter(
      (datas) => datas.name.first == e.target.value
    );
    console.log("column", columnData);
    setFilterValue(columnData);
  };
  return (
    <>
      <div className={`exit-intent-popup ${visible ? "popup-visible" : ""}`}>
        <div className="popup">
          <div
            className="positon-absolute-position-popup-close"
            onClick={() => setVisible(false)}
          >
            <button className="primary-button">Close</button>
          </div>
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
            {filterValue && filterValue.map((item) => <Listitem item={item} />)}
          </section>
        </div>
      </div>
    </>
  );
}
export default Popup;
