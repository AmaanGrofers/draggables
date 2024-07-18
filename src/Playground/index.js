import { useDroppable } from "@dnd-kit/core";
import React from "react";
import DropItem from "../Item/DropItem";
import DroppableArea from "./DroppableArea";

// start index by 1
// have index = 0, to add component on top of already added components..
// have index = index+1, to add component on bottom of already added components..

function Playground({ droppedItems = [], setDroppedItems = () => {} }) {
  console.log("droppedItems :  ", droppedItems);
  const id = "droppable_area";

  return (
    <div style={{ flex: 1, height: "100vh" }}>
      <h2>Playground</h2>

      <div>
        <DroppableArea id={id} index={0} />
        {droppedItems?.map((item, idx) => {
          const { droppableId, data } = item || {};
          return (
            <React.Fragment key={`${droppableId}-${idx}`}>
              <DroppableArea id={droppableId} index={idx} data={data} />
              <DroppableArea id={droppableId} index={idx + 1} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Playground;
