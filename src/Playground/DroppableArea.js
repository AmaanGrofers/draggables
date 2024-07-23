import React, { useCallback, useEffect, useRef, useState } from "react";
import { DndContext, useDroppable, DragOverlay } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ResizableItem from "./ResizableItem";

const columns = 12;

export default function DroppableArea({
  id = "",
  Items = [],
  setDroppedItems = () => {},
}) {
  const [items, setItems] = useState(Items);
  const [activeId, setActiveId] = useState(null);
  const [balanceCol, setBalanceCol] = useState(columns);

  const { isOver, setNodeRef } = useDroppable({
    id,
    disabled: balanceCol === 0,
  });

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log("event on drag : ", event);
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
    // flex: 4,
    width: "1016px", // added padding, remove padding from ResizableItem
    margin: "8px",
    padding: "8px",
  };

  // console.log("Items : ", Items);
  // console.log("items : ", items);

  const balanceColRef = useRef(columns);

  useEffect(() => {
    balanceColRef.current = items.reduce(
      (total, item) => total - (item.width || 4),
      columns
    );

    setBalanceCol(balanceColRef.current);
  });

  // Ensure items are set when Items prop changes
  useEffect(() => {
    setItems(Items);
  }, [Items]);

  const itemsChanged = useCallback(() => {
    setDroppedItems((pv) => ({
      ...pv,
      [id]: items,
    }));
  }, [id, items, setDroppedItems]);

  useEffect(() => {
    itemsChanged();
  }, [itemsChanged]);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div ref={setNodeRef} style={style} id="playground">
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item, idx) => {
            return (
              <ResizableItem
                key={item?.id}
                droppableAreaId={item?.id}
                index={item?.id}
                data={item}
                setItems={setItems}
                balanceCol={balanceCol}
                setBalanceCol={setBalanceCol}
              />
            );
          })}
        </SortableContext>
      </div>
      <DragOverlay>
        {activeId ? <ResizableItem droppableAreaId={activeId} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
