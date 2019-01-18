import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import InputBase from '@material-ui/core/InputBase';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import CheckButton from '@material-ui/icons/Check';
import MoreHorizButton from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './ToDoItem.module.css';

const moreOptions = [
    'Make recurring',
    'Archive',
    'Delete'
];

class ToDoItem extends Component {

    state = {
        moreAnchorEl: null
    }

    handleCheckClick = () => {
        this.props.onCheckClick();
    }

    handleTextChange = event => {
        this.props.onToDoTextChange(event.target.value);
    }

    handleMoreClick = event => {
        const option = event.target.textContent;

        switch (option) {
            case moreOptions[0]:
                this.props.onItemRecurringClick();
                break;
            case moreOptions[1]:
                this.props.onItemArchiveClick();
                break;
            case moreOptions[2]:
                this.props.onItemDeleteClick();
                break;
            default:
        }
        
        this.setState({ moreAnchorEl: null });
    } 

    handleMoreOpen = event => { 
        this.setState({ moreAnchorEl: event.currentTarget });
    }

    handleMoreClose = () => {
        this.setState({ moreAnchorEl: null });
    }

    render() {
        const moreAnchorEl = this.state.moreAnchorEl;
        const isMoreOpen = Boolean(moreAnchorEl);
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
                    <IconButton
                        aria-label="More"
                        aria-owns={isMoreOpen ? 'more-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleMoreOpen}>
                        <MoreHorizButton/>
                    </IconButton>
                    <Menu
                        id="more-menu"
                        anchorEl={moreAnchorEl}
                        open={isMoreOpen}
                        onClose={this.handleMoreClose}>
                        {moreOptions.map(option => (
                            <MenuItem key={option} value={option} onClick={this.handleMoreClick}>
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </CardActions>
            </Card>
        );
    }
}

export default ToDoItem;