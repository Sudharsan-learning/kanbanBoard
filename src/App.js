import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Subheader from "./components/Subheader";
import Bottomheader from "./components/Bottomheader";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import data from "./data.json";
import Popup from "./components/Popup";
import Listitem from "./components/Listitem";

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};
function App() {

  const [visible, setVisible] = useState(false)

  const columnsFromBackend = {
    col1: {
      name: "Open",
      items: data,
    },
    col2: {
      name: "Contacted",
      items: [],
    },
    col3: {
      name: "Written test",
      items: [],
    },
    col4: {
      name: "Technical round",
      items: [],
    },
    col5: {
      name: "Culture fit round",
      items: [],
    },
  };

  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div className="container">
      <Popup visible={visible} setVisible={setVisible}/>
      <aside className="navbar-primary navbar">
        <Sidebar />
      </aside>
      <main>
        <section className="top-nav-bar">
          <Header setVisible={setVisible} />
        </section>
        <section className="subheader-content">
          <Subheader />
        </section>
        <section className="bottom-header">
          <Bottomheader />
        </section>
        <div className="flex h-100 ml-5 no-wrap overflow-x-scroll">
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([columnId, column]) => {

              console.log("column", column)
              return (
                <section key={columnId}>
                  <div className="ml-5">
                    <div className=" seperate-header">
                      <h5>{column.name} - {column.items.length} </h5>
                    </div>
                    <div>
                      <Droppable droppableId={columnId} key={columnId}>
                        {(provided, snapshot) => {
                          return (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              {...(snapshot.isDraggingOver && {
                                className: "landing-col",
                              })}
                              className="max-candidate-height mb-3"
                            >
                              {column.items.map((item, i) => {
                                return (
                                  <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={i}
                                  >
                                    {(provid, snapshoted) => {
                                      return (
                                        <div
                                          ref={provid.innerRef}
                                          {...provid.draggableProps}
                                          {...provid.dragHandleProps}
                                          className="mt-2 mb-2"
                                          style={{
                                            ...provid.draggableProps.style,
                                          }}
                                        >
                                          <Listitem item={item}/>
                                        </div>
                                      );
                                    }}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                            </div>
                          );
                        }}
                      </Droppable>
                    </div>
                  </div>
                </section>
              );
            })}
          </DragDropContext>
        </div>
      </main>
    </div>
  );
}

export default App;
