import React from "react";

function Item({ item }) {
  return (
    <div style={{ padding: "20px", border: "1px solid grey" }}>
      Draggable Item {item?.id}
    </div>
  );
}

export default Item;
