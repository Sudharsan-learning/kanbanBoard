import React from "react";
import Listitem from "./Listitem";

function Item({ provided, item }) {
  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      className="mt-2"
    >
      <Listitem item={item} />
    </div>
  );
}
export default Item;
