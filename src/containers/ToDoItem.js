import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import InputBase from '@material-ui/core/InputBase';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import CheckButton from '@material-ui/icons/Check';
import MoreHorizButton from '@material-ui/icons/MoreHoriz';
import styles from './ToDoItem.module.css';

class ToDoItem extends Component {

    handleCheckClick = () => {
        this.props.onCheckClick();
    }

    handleTextChange = event => {
        this.props.onToDoTextChange(event.target.value);
    }

    render() {
        const checkColor = this.props.isDone ? "#67cb48" : "#C3C3C3";

        return (
            <Card className={styles.card}>
                <CardActions>
                    <IconButton onClick={this.handleCheckClick}>
                        <CheckButton style={{color: checkColor}}/>
                    </IconButton>
                    <InputBase 
                        className={styles.textInput} 
                        value={this.props.toDoText}
                        onChange={this.handleTextChange}/>
                    <p className={styles.createDate}>{this.props.createDate}</p>
                    <p className={styles.updateDate}>{this.props.updateDate}</p>
                    <div className={styles.moreButton}>
                        <IconButton>
                            <MoreHorizButton/>
                        </IconButton>
                    </div>
                </CardActions>
            </Card>
        );
    }
}

export default ToDoItem;