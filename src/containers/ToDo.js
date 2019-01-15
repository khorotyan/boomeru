import React, { Component } from 'react';
import Header from './Header';
import ToDoItem from './ToDoItem';
import ToDoCreator from './ToDoCreator';
import FieldTitles from './FieldTitles';
import styles from './ToDo.module.css';
import StatusOptions from '../entities/StatusOptions';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const OrderType = Object.freeze({createdOrder: 1, updatedOrder: 2})

class ToDo extends Component {

    state = {
        toDoItems: [],
        sortOrder: {
            type: OrderType.createdOrder,
            isDesc: true
        },
        filterText: "",
        selectedStatus: [StatusOptions.Open, StatusOptions.Closed]
    }

    onAddItem = (text) => {
        const toDoItems = [...this.state.toDoItems];

        const date = new Date();
        const newToDoItem = ({
            isDone: false,
            toDoText: text,
            createDate: date,
            updateDate: date
        });
        toDoItems.unshift(newToDoItem);

        this.setState({ toDoItems });
    }

    onCheckClick = (index) => {
        const toDoItems = [...this.state.toDoItems];
        toDoItems[index].isDone = !toDoItems[index].isDone;

        this.setState({ toDoItems });
    }

    toShowDateFormat(date) {
        return months[date.getMonth()] + " " + date.getDate();
    }

    changeCreatedOrder = () => {
        const sortOrder = this.state.sortOrder;
        
        if (sortOrder.type === OrderType.createdOrder) {
            sortOrder.isDesc = !sortOrder.isDesc;
        } else {
            sortOrder.type = OrderType.createdOrder;
            sortOrder.isDesc = true;
        }
        
        this.setState({ sortOrder });
    }

    changeUpdatedOrder = () => {
        const sortOrder = this.state.sortOrder;

        if (sortOrder.type === OrderType.updatedOrder) {
            sortOrder.isDesc = !sortOrder.isDesc;
        } else {
            sortOrder.type = OrderType.updatedOrder;
            sortOrder.isDesc = true;
        }
        
        this.setState({ sortOrder });
    }

    searchToDoItems = (filterText) => {
        this.setState({ filterText });
    }

    applyStatusChange = (selectedStatus) => {
        this.setState({ selectedStatus });
    }

    filterItems() {
        let toDoItems = this.state.toDoItems;
        const filterText = this.state.filterText;
        const selectedStatus = this.state.selectedStatus;

        return toDoItems.filter((toDoItem) => {
            let filterPassed = true;
            
            if (filterText !== "") {
                filterPassed = toDoItem.toDoText.includes(filterText);

                if (!filterPassed) return false;
            }

            if (selectedStatus.length == 0) return false;

            filterPassed = (toDoItem.isDone && selectedStatus.includes(StatusOptions.Closed))
                || (!toDoItem.isDone && selectedStatus.includes(StatusOptions.Open)); 

            return filterPassed;
        });
    }

    render() {
        let toDoItems = this.state.toDoItems;
        const sortOrder = this.state.sortOrder; 

        toDoItems.sort((itemA, itemB) => {
            if (sortOrder.type === OrderType.createdOrder) {
                return sortOrder.isDesc ? itemA.createDate - itemB.createDate 
                    : itemB.createDate - itemA.createDate;
            } else {
                return sortOrder.isDesc ? itemA.updateDate - itemB.updateDate 
                    : itemB.updateDate - itemA.updateDate;
            }
        });

        toDoItems = this.filterItems();

        const toDoList = (
            <div>
                {toDoItems.map((toDoItem, index) => {
                    return <ToDoItem
                        key={index}
                        isDone={toDoItem.isDone}
                        toDoText={toDoItem.toDoText}
                        createDate={this.toShowDateFormat(toDoItem.createDate)}
                        updateDate={this.toShowDateFormat(toDoItem.updateDate)}
                        onCheckClick={() => this.onCheckClick(index)}/>
                })}
            </div>
        );

        return (
            <div className={styles.center}>
                <Header onSearchTextChange={this.searchToDoItems} onStatusChange={this.applyStatusChange}/>
                <ToDoCreator onToDoCreate={this.onAddItem}/>
                <FieldTitles 
                    onCreatedClick={this.changeCreatedOrder} 
                    onUpdatedClick={this.changeUpdatedOrder}
                    show={this.filterItems().length > 0}/>
                {toDoList}
            </div>
        );
    }
}

export default ToDo;