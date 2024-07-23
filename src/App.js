import "./App.css";
import Components from "./Components";
import Playground from "./Playground";
import { DndContext } from "@dnd-kit/core";
import { useState } from "react";

const columns = 12;
const playground_width = 1000;
const each_column = playground_width / columns;
const MINIMUM_COL_REQUIRED = 1;

function App() {
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    console.log("event  : ", event);

    if (over) {
      setDroppedItems((items) => ({
        ...items,
        [over.id]: [...items[over.id], active.data?.current],
      }));
    }
  };

  return (
    <div className="App">
      <DndContext onDragEnd={handleDragEnd}>
        <div style={{ display: "flex" }}>
          {/* //* droppable area */}
          <Playground
            droppedItems={droppedItems}
            setDroppedItems={setDroppedItems}
          />

          {/* //* draggable components */}
          <Components />
        </div>
      </DndContext>
    </div>
  );
}

export default App;
