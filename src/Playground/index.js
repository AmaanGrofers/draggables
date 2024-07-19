// import { useDroppable } from "@dnd-kit/core";
// import React from "react";
// import DropItem from "../Item/DropItem";
// import DroppableArea from "./DroppableArea";

// // start index by 1
// // have index = 0, to add component on top of already added components..
// // have index = index+1, to add component on bottom of already added components..

// function Playground({ droppedItems = [], setDroppedItems = () => {} }) {
//   console.log("droppedItems :  ", droppedItems);
//   const id = "droppable_area";

//   return (
//     <div style={{ flex: 1, height: "100vh" }}>
//       <h2>Playground</h2>

//       <div>
//         <DroppableArea id={id} index={0} />
//         {droppedItems?.map((item, idx) => {
//           const { droppableId, data } = item || {};
//           return (
//             <React.Fragment key={`${droppableId}-${idx}`}>
//               <DroppableArea id={droppableId} index={idx} data={data} />
//               <DroppableArea id={droppableId} index={idx + 1} />
//             </React.Fragment>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Playground;

import React, { useState } from "react";
import { DndContext, useDroppable, DragOverlay } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const columns = 12;

export default function Playground({
  droppedItems: items = [],
  setDroppedItems: setItems = () => {},
}) {
  const { isOver, setNodeRef } = useDroppable({ id: "droppable" });
  const [activeId, setActiveId] = useState(null);

  const handleDragStart = (event) => {
    console.log("drag start:  ", event, event.active.id);
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log("event : ", event);
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  };

  const style = {
    width: "100%",
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: "4px",
    backgroundColor: isOver ? "lightgreen" : "lightblue",
    border: "2px dashed black",
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div ref={setNodeRef} style={style}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <ResizableItem
              key={item?.droppableId}
              id={item?.droppableId}
              data={item?.data?.data?.current}
            />
          ))}
        </SortableContext>
      </div>
      <DragOverlay>
        {activeId ? <ResizableItem id={activeId} /> : null}
      </DragOverlay>
    </DndContext>
  );
}

function ResizableItem({ id, data }) {
  const { id: itemId } = data;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: itemId });
  const [width, setWidth] = useState(4); // Default to 4 columns wide
  const [height, setHeight] = useState(100); // Default height of 100px

  const handleResizeWidth = (newWidth) => {
    setWidth(Math.min(Math.max(newWidth, 1), columns)); // Constrain between 1 and 12
  };

  const handleResizeHeight = (newHeight) => {
    setHeight(Math.max(newHeight, 20)); // Minimum height constraint, adjust as needed
  };

  const style = {
    gridColumn: `span ${width}`,
    gridRow: `span ${Math.ceil(height / 100)}`, // Adjust to fit height based on 100px per row
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "8px",
    backgroundColor: "lightcoral",
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      draggable
    >
      <div>Item {itemId}</div>
      <div>
        <label>Width:</label>
        <input
          type="range"
          min="1"
          max={columns}
          value={width}
          onChange={(e) => handleResizeWidth(Number(e.target.value))}
          style={{ width: "100%" }}
        />
      </div>
      {/* <div>
        <label>Height:</label>
        <input
          type="range"
          min="20"
          max="500"
          value={height}
          onChange={(e) => handleResizeHeight(Number(e.target.value))}
          style={{ width: "100%" }}
        />
      </div> */}
    </div>
  );
}
