import React, { useState } from "react";
import data from "../data.json";
import tech from "../tech.json";
import contact from "../contact.json";
import Listitem from "./Listitem";

function Popup({ visible, setVisible }) {
  const [filterValue, setFilterValue] = useState();
  const getValue = (e) => {
    const totalData = [...data, ...tech, ...contact];
    const columnData = totalData.filter(
      (datas) => datas.name.first === e.target.value
    );
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
          </section>
          <br />
          {filterValue && filterValue.map((item) => <Listitem item={item} />)}
        </div>
      </div>
    </>
  );
}
export default Popup;
