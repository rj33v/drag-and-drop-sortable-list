import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./styles.css";

const colours = [
    { id: "1", name: "one", value: "1", hex: "#F28DA8" },
    { id: "2", name: "two", value: "2", hex: "#73CFD9" },
    { id: "3", name: "three", value: "3", hex: "#08A66C" },
    { id: "4", name: "four", value: "4", hex: "#F2B138" },
    { id: "5", name: "five", value: "5", hex: "#F24141" }
];

const App = () => {
    const [colourList, updateColourList] = useState(colours);

    function handleOnDragEnd(result) {
        //console.log(colours);
        if (!result.destination) return;
        const items = Array.from(colourList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateColourList(items);
    }

    return (
        <section className="App">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="mycolours">
                    {(provided) => (
                        <div
                            droppableId="mycolours"
                            className="colourlist-items"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {colourList.map(({ id, hex, name }, index) => {
                                return (
                                    <Draggable
                                        key={id}
                                        draggableId={id}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                className={`colourlist-item ${name}`}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                            >
                                                {hex} {name}
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </section>
    );
};

export default App;
