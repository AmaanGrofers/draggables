import React from "react";

function DropItem({ item }) {
  return (
    <div style={{ height: "100%", border: "1px solid grey" }}>
      Draggable Item {item?.id}
      name: {item?.name}
    </div>
  );
}

export default DropItem;
