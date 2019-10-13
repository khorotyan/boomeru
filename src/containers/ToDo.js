import React, { Component } from "react";
import Header from "./Header";
import ToDoItem from "./ToDoItem";
import ToDoCreator from "./ToDoCreator";
import FieldTitles from "../components/FieldTitles";
import styles from "./ToDo.module.css";
import StatusOptions from "../entities/StatusOptions";
import FilterOptions from "../entities/FilterOptions";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const TODOITEMS_KEY = "ToDoItems";

const OrderType = Object.freeze({ createdOrder: 1, updatedOrder: 2 });

class ToDo extends Component {
  state = {
    toDoItems: this.loadToDoItems(),
    sortOrder: {
      type: OrderType.createdOrder,
      isDesc: true
    },
    filterText: "",
    selectedFilter: FilterOptions.None,
    selectedStatus: [StatusOptions.Open, StatusOptions.Closed],
    isSnackbarOpen: false,
    lastDeletedItem: {
      toDoItem: {},
      index: -1
    }
  };

  storeToDoItems = toDoItems => {
    localStorage.setItem(TODOITEMS_KEY, JSON.stringify(toDoItems));
  };

  loadToDoItems() {
    const jsonToDoItems = localStorage.getItem(TODOITEMS_KEY);

    if (jsonToDoItems === null) {
      return [];
    }

    const toDoItems = JSON.parse(jsonToDoItems);

    return toDoItems.map(todoItem => {
      todoItem.createDate = new Date(todoItem.createDate);
      todoItem.updateDate = new Date(todoItem.updateDate);
      return todoItem;
    });
  }

  handleSnackbarOpen = (toDoItem, index) => {
    const isSnackbarOpen = this.state.isSnackbarOpen;

    this.setState({ lastDeletedItem: { toDoItem, index } });

    if (isSnackbarOpen) {
      this.setState({ isSnackbarOpen: false });
    } else {
      this.processSnackbarQueue(toDoItem, index);
    }
  };

  processSnackbarQueue = (toDoItem = null, index) => {
    const lastDeletedItem = this.state.lastDeletedItem;

    if (Object.keys(lastDeletedItem.toDoItem).length === 0) {
      this.setState({
        isSnackbarOpen: true,
        lastDeletedItem: { toDoItem, index }
      });
    } else {
      this.setState({ lastDeletedItem: { toDoItem: {}, index: -1 } });
    }
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway" && event.type === "mouseup") {
      return;
    }

    this.setState({ isSnackbarOpen: false });
  };

  handleSnackbarUndo = () => {
    const lastDeletedItem = this.state.lastDeletedItem;
    const toDoItems = [...this.state.toDoItems];

    toDoItems.splice(lastDeletedItem.index, 0, lastDeletedItem.toDoItem);

    this.setState({ toDoItems, isSnackbarOpen: false });
  };

  handleSnackbarExited = () => {
    this.processSnackbarQueue();
  };

  onAddItem = (text, isRecurring = false) => {
    const toDoItems = [...this.state.toDoItems];

    let id = 0;

    if (toDoItems.length !== 0) {
      id = toDoItems[0].id + 1;
    }

    const date = new Date();
    const newToDoItem = {
      id: id,
      isDone: false,
      toDoText: text,
      createDate: date,
      updateDate: date,
      isRecurring: isRecurring,
      isArchived: false
    };
    toDoItems.unshift(newToDoItem);

    this.storeToDoItems(toDoItems);
    this.setState({ toDoItems });
  };

  changeIsDoneStatus = id => {
    const toDoItems = [...this.state.toDoItems];
    const index = this.getItemIndex(toDoItems, id);

    toDoItems[index].isDone = !toDoItems[index].isDone;

    this.storeToDoItems(toDoItems);
    this.setState({ toDoItems });
  };

  toShowDateFormat = dateStr => {
    const date = new Date(dateStr);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return (
      months[date.getMonth()] +
      " " +
      date.getDate() +
      ", " +
      hours +
      ":" +
      minutes +
      " " +
      ampm
    );
  };

  changeCreatedOrder = () => {
    const sortOrder = this.state.sortOrder;

    if (sortOrder.type === OrderType.createdOrder) {
      sortOrder.isDesc = !sortOrder.isDesc;
    } else {
      sortOrder.type = OrderType.createdOrder;
      sortOrder.isDesc = true;
    }

    this.setState({ sortOrder });
  };

  changeUpdatedOrder = () => {
    const sortOrder = this.state.sortOrder;

    if (sortOrder.type === OrderType.updatedOrder) {
      sortOrder.isDesc = !sortOrder.isDesc;
    } else {
      sortOrder.type = OrderType.updatedOrder;
      sortOrder.isDesc = true;
    }

    this.setState({ sortOrder });
  };

  searchToDoItems = filterText => {
    this.setState({ filterText });
  };

  applyStatusChange = selectedStatus => {
    this.setState({ selectedStatus });
  };

  applyFilterChange = selectedFilter => {
    this.setState({ selectedFilter });
  };

  filterItems = (sortedToDoItems = null) => {
    let toDoItems =
      sortedToDoItems === null ? [...this.state.toDoItems] : sortedToDoItems;
    const filterText = this.state.filterText;
    const selectedStatus = this.state.selectedStatus;
    const selectedFilter = this.state.selectedFilter;

    return toDoItems.filter(toDoItem => {
      let filterPassed = true;

      if (filterText !== "") {
        filterPassed = toDoItem.toDoText.includes(filterText);

        if (!filterPassed) return false;
      }

      if (selectedStatus.length === 0) return false;

      filterPassed =
        (toDoItem.isDone && selectedStatus.includes(StatusOptions.Closed)) ||
        (!toDoItem.isDone && selectedStatus.includes(StatusOptions.Open));

      if (!filterPassed) return false;

      filterPassed =
        (toDoItem.isArchived && selectedFilter === FilterOptions.Archived) ||
        (!toDoItem.isArchived && selectedFilter !== FilterOptions.Archived);

      if (!filterPassed) return false;

      filterPassed =
        (toDoItem.isRecurring && selectedFilter === FilterOptions.Recurring) ||
        selectedFilter !== FilterOptions.Recurring;

      return filterPassed;
    });
  };

  getItemIndex = (toDoItems, id) => {
    return toDoItems.findIndex(toDoItem => toDoItem.id === id);
  };

  changeToDoText = (newText, id) => {
    const toDoItems = [...this.state.toDoItems];
    const index = this.getItemIndex(toDoItems, id);
    toDoItems[index].toDoText = newText;
    toDoItems[index].updateDate = new Date();

    this.storeToDoItems(toDoItems);
    this.setState({ toDoItems });
  };

  makeItemDuplicate = (toDoText, isRecurring) => {
    this.onAddItem(toDoText, isRecurring);
  };

  makeItemRecurring = id => {
    const toDoItems = [...this.state.toDoItems];
    const index = this.getItemIndex(toDoItems, id);
    toDoItems[index].isRecurring = !toDoItems[index].isRecurring;

    this.storeToDoItems(toDoItems);
    this.setState({ toDoItems });
  };

  archiveItem = id => {
    const toDoItems = [...this.state.toDoItems];
    const index = this.getItemIndex(toDoItems, id);
    toDoItems[index].isArchived = !toDoItems[index].isArchived;

    this.storeToDoItems(toDoItems);
    this.setState({ toDoItems });
  };

  deleteItem = todoItem => {
    const toDoItems = [...this.state.toDoItems];
    const index = this.getItemIndex(toDoItems, todoItem.id);

    if (index > -1) {
      this.handleSnackbarOpen(todoItem, index);
      toDoItems.splice(index, 1);

      this.storeToDoItems(toDoItems);
      this.setState({ toDoItems });
    }
  };

  render() {
    let toDoItems = [...this.state.toDoItems];
    const sortOrder = this.state.sortOrder;
    const lastDeletedItem = this.state.lastDeletedItem;
    const isSnackbarOpen = this.state.isSnackbarOpen;

    toDoItems.sort((itemA, itemB) => {
      if (sortOrder.type === OrderType.createdOrder) {
        return sortOrder.isDesc
          ? itemA.createDate - itemB.createDate
          : itemB.createDate - itemA.createDate;
      } else {
        return sortOrder.isDesc
          ? itemA.updateDate - itemB.updateDate
          : itemB.updateDate - itemA.updateDate;
      }
    });

    toDoItems = this.filterItems(toDoItems);

    const toDoList = (
      <div>
        {toDoItems.map(toDoItem => {
          return (
            <ToDoItem
              key={toDoItem.id}
              isDone={toDoItem.isDone}
              toDoText={toDoItem.toDoText}
              createDate={this.toShowDateFormat(toDoItem.createDate)}
              updateDate={this.toShowDateFormat(toDoItem.updateDate)}
              isRecurring={toDoItem.isRecurring}
              isArchived={toDoItem.isArchived}
              onCheckClick={() => this.changeIsDoneStatus(toDoItem.id)}
              onToDoTextChange={newText =>
                this.changeToDoText(newText, toDoItem.id)
              }
              onItemDuplicateClick={() =>
                this.makeItemDuplicate(toDoItem.toDoText, toDoItem.isRecurring)
              }
              onItemRecurringClick={() => this.makeItemRecurring(toDoItem.id)}
              onItemArchiveClick={() => this.archiveItem(toDoItem.id)}
              onItemDeleteClick={() => this.deleteItem(toDoItem)}
            />
          );
        })}
      </div>
    );

    return (
      <div className={styles.center}>
        <Header
          onSearchTextChange={this.searchToDoItems}
          onStatusChange={this.applyStatusChange}
          onFilterChange={this.applyFilterChange}
        />
        <ToDoCreator onToDoCreate={this.onAddItem} />
        <FieldTitles
          onCreatedClick={this.changeCreatedOrder}
          onUpdatedClick={this.changeUpdatedOrder}
          show={this.filterItems().length > 0}
        />
        <div className={styles.toDoListWrapper}>{toDoList}</div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={isSnackbarOpen}
          autoHideDuration={3000}
          onClose={this.handleSnackbarClose}
          onExited={this.handleSnackbarExited}
          ContentProps={{ "aria-describedby": "desc-message-id" }}
          message={
            <span id="desc-message-id">
              {lastDeletedItem.toDoItem.toDoText}
            </span>
          }
          action={[
            <Button
              key="undo"
              color="secondary"
              size="small"
              onClick={this.handleSnackbarUndo}
            >
              UNDO
            </Button>,
            <IconButton
              style={{ color: "#ffffff" }}
              key="close"
              onClick={this.handleSnackbarClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

export default ToDo;
