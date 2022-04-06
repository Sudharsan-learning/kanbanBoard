import React, { useLayoutEffect, useRef, useState } from "react";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import data from "./data.json";
import tech from "./tech.json";
import contact from "./contact.json";
import Popup from "./components/Popup";
import { reorderList } from "./components/Reorder";
import { areEqual, FixedSizeList } from "react-window";
import Listitem from "./components/Listitem";

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
  function Item({ provided, item }) {
    return (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        className="mt-2"
      >
        <Listitem item={item} />
      </div>
    );
  }
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
          );
        }}
      </Droppable>
    );
  });
  const Column = React.memo(function Column({ column, index }) {
    return (
      <Draggable draggableId={column.id} index={index}>
        {(provid) => (
          <div {...provid.draggableProps} ref={provid.innerRef}>
            <h5 class="seperate-header mt-3 mb-3" {...provid.dragHandleProps}>
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
      return null;
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
      <aside className="navbar-primary navbar h-100">
        <div className="flex flex-column align-items-center space-between h-100">
          <div className="text-center">
            <i className="logo-icon-parent">
              <img src="./logo.png" className="logo-icon icon" />
            </i>
            <div className="m-2 mt-3">
              <i className="fa fa-gauge f-icon"></i>
            </div>
            <div className="m-2 mt-3">
              <i className="fa fa-inbox f-icon "></i>
            </div>
            <div className="m-2 mt-3">
              <i className="fa fa-briefcase f-icon "></i>
            </div>
            <div className="m-2 mt-3">
              <i className="fa fa-user-group f-icon "></i>
            </div>
            <div className="m-2 mt-3">
              <i className="fa fa-file f-icon "></i>
            </div>
            <div className="m-2 mt-3">
              <i className="fa fa-gear f-icon "></i>
            </div>
          </div>
          <div className="text-center">
            <div className="m-2 mt-3">
              <i className="fa fa-circle-question f-icon"></i>
            </div>
            <div className="m-2 mt-3">
              <i className="fa fa-message f-icon"></i>
            </div>
            <div className="m-2 mt-3">
              <i className="fa fa-message f-icon"></i>
            </div>
          </div>
        </div>
      </aside>
      <main>
        <section className="top-nav-bar w-100">
          <div className="flex align-items-center space-between">
            <div className="flex align-items-center">
              <i className="navbar-logo ml-5">
                <img src="./logo.png" className="nav-logo-icon" />
              </i>
              <h3 className="brand-font">iamneo.ai Talent Center</h3>
            </div>
            <div className="flex align-items-center position-relative">
              <div onClick={() => setVisible(true)}>
                <input
                  type="search"
                  className="input-search"
                  placeholder="Search"
                />
                <i className="fa fa-search positon-absolute-position position-absolute"></i>
              </div>
              <button className="primary-button ml-3">
                <i className="fa fa-plus"></i>Add New
              </button>
              <div className="m-2">
                <i className="top-nav-separator "></i>
              </div>
              <div className="position-relative ml-1">
                <i className="fa fa-gift"></i>
                <div class="beamer-icon position-absolute text-center">1</div>
              </div>
              <div className="avatar-circle ml-3 text-center">
                <span className="avatar-icon">S</span>
              </div>
            </div>
          </div>
        </section>
        <section className="subheader-content">
          <div className="flex align-items-center space-between">
            <div className="flex align-items-center">
              <div className="ml-5">
                <i className="fa fa-briefcase ml-5"></i>
              </div>
              <p className="ml-2"> Jobs</p>
              <p className="ml-3">&#10095;</p>
              <p className="ml-3"> Full Stack Developer</p>
              <button className="ml-2 secondary-button">
                View Job Details
              </button>
            </div>
            <div className="flex align-items-center position-relative">
              <div className="ml-3">
                <button className="secondary-button bigger">
                  Add Candidate
                </button>
                <button className="secondary-button bigger bl-0">
                  <i className="fa fa-angle-down"></i>
                </button>
              </div>
              <div className="ml-3">
                <button className="primary-button">
                  <i className="fa fa-globe mr-1"></i> Published{" "}
                  <i className="fa fa-angle-down ml-2 f-8"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="bottom-header">
          <div className="flex align-items-center space-between">
            <div className="flex align-items-center">
              <div className="ml-5">
                <p className="ml-5">
                  All candidates - <span> Active (48)</span>
                  <i className="fa fa-angle-down f-8 ml-2"></i>
                </p>
              </div>
              <div className="ml-5">
                <p className="ml-5">
                  <span className="mr-2">Sort by</span>Last Updated
                  <i className="fa fa-angle-down f-8 ml-2"></i>
                </p>
              </div>
            </div>
            <div className="flex align-items-center">
              <div className="ml-4">
                <i className="fa fa-list"></i>
              </div>
              <span className="ml-4">
                <i className="fa fa-filter"></i>
              </span>
              <div className="ml-4">
                <i className="fa fa-upload"></i>
              </div>
            </div>
          </div>
        </section>
        <div className="flex h-100 ml-5 no-wrap overflow-x-scroll">
          <DragDropContext onDragEnd={onDragEnd}>
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
          </DragDropContext>
        </div>
      </main>
    </div>
  );
}
export default App;
