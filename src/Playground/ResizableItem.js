import { useSortable } from "@dnd-kit/sortable";
import { Resizable } from "re-resizable";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";

const columns = 12;
const playground_width = 1000;
const each_column = playground_width / columns;
const MINIMUM_COL_REQUIRED = 1;

function ResizableItem({
  droppableAreaId,
  data = {},
  setItems = () => {},
  balanceCol,
  setBalanceCol,
}) {
  // var playground = document.getElementById("playground");
  // var playground_width = playground.offsetWidth;
  // console.log("playground_width : ", playground_width);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: droppableAreaId });

  const [state, setState] = useState({
    // width: 4,
    width: balanceCol >= 4 ? 4 : balanceCol, // if setting balanceCol, then also set setBalanceCol(0)
    height: 50,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "8px",
    backgroundColor: "lightcoral",
    cursor: "grab",
  };

  // console.log("balanceCol  :", balanceCol);

  return (
    <Resizable
      style={style}
      size={{
        width: Math.floor(state.width) * each_column,
        height: state.height,
      }}
      onResizeStop={(e, direction, ref, d) => {
        let additional_width = Math.floor(d.width / each_column);

        if (balanceCol <= additional_width) {
          console.log("larger....");
          additional_width = balanceCol;
          setBalanceCol(0);
        } else {
          console.log("additional_width : ", additional_width);
          setBalanceCol((pv) => pv - additional_width);
        }

        console.log("balanceCol  :", balanceCol);

        let newWidth = state.width + additional_width;
        let newHeight = state.height + d.height;

        setState({
          width: newWidth,
          height: newHeight,
        });

        setItems((pv) => {
          let items = pv;
          let idx = items.findIndex((item) => item.data.id === data.id);
          items[idx] = { ...items[idx], width: newWidth, height: newHeight };
          return items;
        });
      }}
    >
      <div
        ref={setNodeRef}
        {...attributes}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <div>Area {droppableAreaId}</div>
          <div>Item {data?.id}</div>
        </div>
        <button {...listeners}>Drag handle</button>
      </div>
    </Resizable>
  );
}

export default ResizableItem;
