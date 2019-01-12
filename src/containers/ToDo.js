import React, { Component } from 'react';

import ToDoItem from './ToDoItem';
import styles from './ToDo.module.css';

class ToDo extends Component {
    render() {
        return (
            <div className={styles.center}>
                <ToDoItem 
                    toDoText="Example of a ToDo item"
                    createDate="Jan 10"
                    updateDate="Jan 10"/>
                <ToDoItem 
                    toDoText="Another example of a ToDo item"
                    createDate="Jan 10"
                    updateDate="Jan 11"/>
                <ToDoItem 
                    toDoText="Simple ToDo item"
                    createDate="Jan 11"
                    updateDate="Jan 12"/>
            </div>
        );
    }
}

export default ToDo;