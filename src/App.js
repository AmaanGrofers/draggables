import "./App.css";
import Components from "./Components";
import Playground from "./Playground";
import { DndContext } from "@dnd-kit/core";
import { useState } from "react";

function App() {
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over) {
      setDroppedItems((items) => [...items, active.data?.current]);
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
