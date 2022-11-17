import React, { forwardRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Item = forwardRef(({ label, ...props }, ref) => {
  return (
    <div ref={ref} className="item" {...props}>
      {label}
    </div>
  );
});

function SortableItem({ index, data }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: data[index] });

  const itemStyle = {
    backgroundColor: "#f8e6dc",
    transform: CSS.Transform.toString(transform),
    transition,
    flexGrow: 1,
    borderRadius: "1rem",
    margin: 3,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Item
      ref={setNodeRef}
      style={itemStyle}
      label={data[index]}
      {...attributes}
      {...listeners}
    />
  );
}

// function SortableItem({ index, data }) {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition
//   } = useSortable({ id: data[index].headerName });

//   const itemStyle = {
//     backgroundColor: "#f8e6dc",
//     transform: CSS.Transform.toString(transform),
//     transition,
//     flexGrow: 1,
//     borderRadius: "1rem",
//     margin: 3,
//     textAlign: "center",
//   };

//   return (
//     <Item
//       ref={setNodeRef}
//       style={itemStyle}
//       label={data[index].headerName}
//       {...attributes}
//       {...listeners}
//     />
//   );
// }

export { Item, SortableItem };