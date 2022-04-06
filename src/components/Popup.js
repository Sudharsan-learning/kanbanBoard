import React, { useState } from "react";
import data from "../data.json";
import tech from "../tech.json";
import contact from "../contact.json";
import Listitem from "./Listitem";

function Popup({ visible, setVisible }) {
  const [filterValue, setFilterValue] = useState();
  const getValue = (e) => {
    if (e.target.value == "") {
      return setFilterValue([]);
    }
    const totalData = [...data, ...tech, ...contact];
    const columnData = totalData.filter((datas) =>
      datas.name.first.includes(e.target.value)
    );
    setFilterValue(columnData);
  };
  return (
    <>
      <div className={`exit-intent-popup ${visible ? "popup-visible" : ""}`}>
        <div className="popup position-absolute popup-bar">
          <div
            className="positon-absolute-position-popup-close position-absolute"
            onClick={() => setVisible(false)}
          >
            <button className="primary-button">Close</button>
          </div>
          <section className="popup-container">
            <div>
              <input
                type="search"
                className="input-search-popup form-control w-100"
                placeholder="Search candidate by name"
                onChange={getValue}
              />
              <i className="fa fa-search positon-absolute-position-popup position-absolute"></i>
            </div>
          </section>
          <br />
        </div>
        <div className="popup position-absolute popup-filter">
          {visible
            ? filterValue && filterValue.map((item) => <Listitem item={item} />)
            : ""}
        </div>
      </div>
    </>
  );
}
export default Popup;
