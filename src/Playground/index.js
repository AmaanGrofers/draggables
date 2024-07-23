import React from "react";
import DroppableArea from "./DroppableArea";

// start index by 1
// have index = 0, to add component on top of already added components..
// have index = index+1, to add component on bottom of already added components..

function Playground({ droppedItems = [], setDroppedItems = () => {} }) {
  const id = "droppable_area";

  return (
    <div style={{ flex: 1, height: "100vh" }}>
      <h2>Playground</h2>

      {[1, 2, 3].map((idx) => (
        <DroppableArea
          id={`${id}-${idx}`}
          Items={droppedItems?.[`${id}-${idx}`]}
          setDroppedItems={setDroppedItems}
        />
      ))}
    </div>
  );
}

export default Playground;
