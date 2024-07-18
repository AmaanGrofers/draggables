import { useDroppable } from "@dnd-kit/core";
import React from "react";
import Item from "../Item";

function Playground({ droppedItems = [], setDroppedItems = () => {} }) {
  console.log("droppedItems :  ", droppedItems);

  const { isOver, setNodeRef } = useDroppable({ id: "droppable_area" });

  const style = {
    margin: "100px",
    height: "40vh",
    border: "1px solid black",
    backgroundColor: isOver ? "lightgreen" : "white",
  };

  return (
    <div style={{ flex: 1, height: "100vh" }}>
      <h2>Playground</h2>

      <div ref={setNodeRef} style={style}>
        <div>
          {droppedItems?.map((dropped = {}) => (
            <Item key={dropped?.id} item={dropped?.data?.current} />
          ))}
        </div>
        Drop here
      </div>
    </div>
  );
}

export default Playground;
