import React, { Component } from 'react';
import Header from './Header';
import ToDoItem from './ToDoItem';
import ToDoCreator from './ToDoCreator';
import FieldTitles from './FieldTitles';
import styles from './ToDo.module.css';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const OrderType = Object.freeze({"createdOrder": 1, "updatedOrder": 2})

class ToDo extends Component {

    state = {
        toDoItems: [],
        sortOrder: {
            type: OrderType.createdOrder,
            isDesc: true
        },
        filterText: ""
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

    render() {
        let toDoItems = this.state.toDoItems;
        const sortOrder = this.state.sortOrder;
        const filterText = this.state.filterText;
 
        toDoItems.sort((itemA, itemB) => {
            if (sortOrder.type === OrderType.createdOrder) {
                return sortOrder.isDesc ? itemA.createDate - itemB.createDate 
                    : itemB.createDate - itemA.createDate;
            } else {
                return sortOrder.isDesc ? itemA.updateDate - itemB.updateDate 
                    : itemB.updateDate - itemA.updateDate;
            }
        });

        if (filterText !== "") {
            toDoItems = toDoItems.filter((toDoItem) => {
                return toDoItem.toDoText.includes(filterText);
            });
        }

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
                <Header onSearchTextChange={this.searchToDoItems}/>
                <ToDoCreator onToDoCreate={this.onAddItem}/>
                <FieldTitles 
                    onCreatedClick={this.changeCreatedOrder} 
                    onUpdatedClick={this.changeUpdatedOrder}/>
                {toDoList}
            </div>
        );
    }
}

export default ToDo;