import React, { Component } from 'react';
import Header from './Header';
import ToDoItem from './ToDoItem';
import ToDoCreator from './ToDoCreator';
import FieldTitles from './FieldTitles';
import styles from './ToDo.module.css';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class ToDo extends Component {

    state = {
        toDoItems: []
    }

    onAddItem = (text) => {
        const toDoItems = [...this.state.toDoItems];

        const date = new Date();
        const time = months[date.getMonth()] + " " + date.getDate();
        const newToDoItem = ({
            isDone: false,
            toDoText: text,
            createDate: time,
            updateDate: time
        });
        toDoItems.unshift(newToDoItem);

        this.setState({ toDoItems });
    }

    onCheckClick = (index) => {
        const toDoItems = [...this.state.toDoItems];
        toDoItems[index].isDone = !toDoItems[index].isDone;

        this.setState({ toDoItems });
    }

    render() {
        let toDoList = (
            <div>
                {this.state.toDoItems.map((toDoItem, index) => {
                    return <ToDoItem
                        key={index}
                        isDone={toDoItem.isDone}
                        toDoText={toDoItem.toDoText}
                        createDate={toDoItem.createDate}
                        updateDate={toDoItem.updateDate}
                        onCheckClick={() => this.onCheckClick(index)}/>
                })}
            </div>
        );

        return (
            <div className={styles.center}>
                <Header/>
                <ToDoCreator onToDoCreate={this.onAddItem}/>
                <FieldTitles/>
                {toDoList}
            </div>
        );
    }
}

export default ToDo;