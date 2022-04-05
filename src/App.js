import React, { useLayoutEffect, useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Subheader from "./components/Subheader";
import Bottomheader from "./components/Bottomheader";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import data from "./data.json";
import tech from "./tech.json";
import contact from "./contact.json";
import Popup from "./components/Popup";
import { reorderList } from "./components/Reorder";
import { areEqual, FixedSizeList } from "react-window";
import Item from "./components/Item";

function App() {
  const [visible, setVisible] = useState(false);
  const columnsFromBackend = {
    column: {
      col1: {
        name: "Open",
        items: data,
        id: "col1",
      },
      col2: {
        name: "Contacted",
        items: contact,
        id: "col2",
      },
      col3: {
        name: "Written test",
        items: [],
        id: "col3",
      },
      col4: {
        name: "Technical round",
        items: tech,
        id: "col4",
      },
      col5: {
        name: "Culture fit round",
        items: [],
        id: "col5",
      },
    },
    columnOrder: ["col1", "col2", "col3", "col4", "col5"],
  };
  const [state, setState] = useState(columnsFromBackend);

  const Row = React.memo(function Row(props) {
    const { data: items, index, style } = props;
    const item = items[index];
    if (!item) {
      return null;
    }
    return (
      <Draggable draggableId={item.id} index={index} key={item.id}>
        {(provided) => <Item provided={provided} item={item} style={style} />}
      </Draggable>
    );
  }, areEqual);
  const ItemList = React.memo(function ItemList({ column, index }) {
    const listRef = useRef();
    useLayoutEffect(() => {
      const list = listRef.current;
      if (list) {
        list.scrollTo(0);
      }
    }, [index]);

    return (
      <Droppable
        droppableId={column.id}
        renderClone={(provided, snapshot, rubric) => (
          <Item
            provided={provided}
            isDragging={snapshot.isDragging}
            item={column.items[rubric.source.index]}
          />
        )}
      >
        {(provided, snapshot) => {
          const itemCount = snapshot.isUsingPlaceholder
            ? column.items.length + 1
            : column.items.length;
          return (
            <>
              <FixedSizeList
                height={400}
                itemCount={itemCount}
                itemSize={100}
                width={270}
                outerRef={provided.innerRef}
                itemData={column.items}
                ref={listRef}
              >
                {Row}
              </FixedSizeList>
              {provided.placeholder}
            </>
          );
        }}
      </Droppable>
    );
  });
  const Column = React.memo(function Column({ column, index }) {
    return (
      <Draggable draggableId={column.id} index={index}>
        {(provided) => (
          <div {...provided.draggableProps} ref={provided.innerRef}>
            <h5 className="seperate-header mt-3" {...provided.dragHandleProps}>
              {column.name} - {column.items.length}
            </h5>
            <ItemList column={column} index={index} />
          </div>
        )}
      </Draggable>
    );
  });
  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.type === "column") {
      const columnOrder = reorderList(
        state.columnOrder,
        result.source.index,
        result.destination.index
      );
      setState({
        ...state,
        columnOrder,
      });
      return;
    }
    if (result.source.droppableId === result.destination.droppableId) {
      const column = state.column[result.source.droppableId];
      const items = reorderList(
        column.items,
        result.source.index,
        result.destination.index
      );
      const newStates = {
        ...state,
        column: {
          ...state.column,
          [column.id]: {
            ...column,
            items,
          },
        },
      };
      setState(newStates);
      return;
    }
    const sourceColumn = state.column[result.source.droppableId];
    const destinationColumn = state.column[result.destination.droppableId];
    const item = sourceColumn.items[result.source.index];
    const newSourceColumn = {
      ...sourceColumn,
      items: [...sourceColumn.items],
    };
    newSourceColumn.items.splice(result.source.index, 1);
    const newDestinationColumn = {
      ...destinationColumn,
      items: [...destinationColumn.items],
    };
    newDestinationColumn.items.splice(result.destination.index, 0, item);
    const newState = {
      ...state,
      column: {
        ...state.column,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn,
      },
    };
    setState(newState);
  }
  return (
    <div className="container">
      <Popup visible={visible} setVisible={setVisible} />
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
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="app">
              <Droppable
                droppableId="all-droppables"
                direction="horizontal"
                type="column"
              >
                {(provided) => (
                  <div
                    className="flex h-100 ml-5 no-wrap w-100 space-between"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {state.columnOrder.map((columnId, index) => (
                      <Column
                        key={columnId}
                        column={state.column[columnId]}
                        index={index}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>
      </main>
    </div>
  );
}
export default App;
