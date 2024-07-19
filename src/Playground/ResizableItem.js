import { useSortable } from "@dnd-kit/sortable";
import { Resizable } from "re-resizable";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";

const columns = 12;

function ResizableItem({ id }) {
  var playground = document.getElementById("playground");
  var playground_width = playground.offsetWidth;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const [state, setState] = useState({ width: 4, height: 50 });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "8px",
    backgroundColor: "lightcoral",
    cursor: "grab",
  };

  return (
    <Resizable
      style={style}
      size={{ width: state.width, height: state.height }}
      onResizeStop={(e, direction, ref, d) => {
        let each_column = playground_width / columns;
        let newWidth = Math.floor(
          Math.floor((state.width + d.width) / each_column) * each_column
        );

        setState({
          width: newWidth,
          height: state.height + d.height,
        });
      }}
    >
      <div ref={setNodeRef} {...attributes} {...listeners} draggable>
        <div>Item {id}</div>
      </div>
    </Resizable>
  );
}

export default ResizableItem;
