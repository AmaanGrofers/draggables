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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ResizableItem from "./ResizableItem";

const columns = 12;

export default function Playground({
  droppedItems: items = [],
  setDroppedItems: setItems = () => {},
}) {
  const { isOver, setNodeRef } = useDroppable({ id: "droppable" });
  const [activeId, setActiveId] = useState(null);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  };

  const style = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: "4px",
    backgroundColor: isOver ? "lightgreen" : "lightblue",
    border: "2px dashed black",
    flex: 4,
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div ref={setNodeRef} style={style} id="playground">
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <ResizableItem key={item?.id} id={item?.id} />
          ))}
        </SortableContext>
      </div>
      <DragOverlay>
        {activeId ? <ResizableItem id={activeId} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
