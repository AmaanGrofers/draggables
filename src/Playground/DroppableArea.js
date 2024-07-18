import { useDroppable } from "@dnd-kit/core";
import React from "react";
import DropItem from "../Item/DropItem";

function DroppableArea({ id, index, data }) {
  const { isOver, setNodeRef } = useDroppable({ id: `${id}-${index}` });

  // current contains the data.........
  const { data: { current = {} } = {} } = data || {};

  const style = {
    border: "1px solid black",
    backgroundColor: isOver ? "lightgreen" : "white",
    flex: 20,
  };

  const containerStyle = {
    display: "flex",
    margin: "100px",
    height: "10vh",
  };

  return (
    <div style={containerStyle}>
      <div style={{ flex: 1 }}>{index}</div>
      <div ref={setNodeRef} style={style}>
        {Object.keys(current).length > 0 ? <DropItem item={current} /> : null}
      </div>
    </div>
  );
}

export default DroppableArea;
