import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import CheckButton from '@material-ui/icons/Check';
import MoreHorizButton from '@material-ui/icons/MoreHoriz';
import styles from './ToDoItem.module.css';

class ToDoItem extends Component {
    render() {
        return (
            <Card className={styles.card}>
                <CardActions>
                    <IconButton>
                        <CheckButton/>
                    </IconButton>
                    <p className={styles.toDoText}>{this.props.toDoText}</p>
                    <p className={styles.createDate}>{this.props.createDate}</p>
                    <p className={styles.updateDate}>{this.props.updateDate}</p>
                    <div className={styles.more}>
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