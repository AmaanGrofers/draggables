import React from "react";
import DraggableItem from "./DraggableItem";

const data = [
  { id: 1, name: "Component 1" },
  { id: 2, name: "Component 2" },
  { id: 3, name: "Component 3" },
  { id: 4, name: "Component 4" },
];

function Components() {
  return (
    <div style={{ flex: 1, borderLeft: "1px solid black", height: "100vh" }}>
      <h2>Components</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "100px",
        }}
      >
        {data.map((item) => (
          <div key={item?.id}>
            <DraggableItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Components;
