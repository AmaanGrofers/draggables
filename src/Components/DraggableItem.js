import { useDraggable } from "@dnd-kit/core";
import React from "react";
import Item from "../Item";

function DraggableItem({ item }) {
  const { id } = item || {};
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: item,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="container"
    >
      <Item item={item} />
    </div>
  );
}
export default DraggableItem;
