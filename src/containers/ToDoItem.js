import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import InputBase from '@material-ui/core/InputBase';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import RepeatIcon from '@material-ui/icons/Repeat';
import MoreHorizButton from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './ToDoItem.module.css';

const moreOptions = [
    'Duplicate',
    'Make recurring', // Undo recurring
    'Archive', // Unarchive
    'Delete'
];

class ToDoItem extends Component {

    state = {
        moreAnchorEl: null
    }

    handleCheckClick = () => {
        this.props.onCheckClick();
    }

    handleTextChange = (event) => {
        this.props.onToDoTextChange(event.target.value);
    }

    handleMoreClick = (event) => {
        const option = event.target.textContent;

        switch (option) {
            case moreOptions[0]:
                this.props.onItemDuplicateClick();
                break;
            case moreOptions[1]:
                this.props.onItemRecurringClick();
                break;
            case moreOptions[2]:
                this.props.onItemArchiveClick();
                break;
            case moreOptions[3]:
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
        const isRecurring = this.props.isRecurring;
        const inputWidth = isRecurring ? 320 : 350;

        return (
            <Card className={styles.card}>
                <CardActions>
                    <IconButton onClick={this.handleCheckClick}>
                        <CheckIcon style={{color: checkColor}}/>
                    </IconButton>
                    <InputBase
                        style={{width: inputWidth}} 
                        value={this.props.toDoText}
                        onChange={this.handleTextChange}/>
                    {isRecurring ? <RepeatIcon/> : null}
                    <p className={styles.createDate}>{this.props.createDate}</p>
                    <p className={styles.updateDate}>{this.props.updateDate}</p>
                    <IconButton
                        onClick={this.handleMoreOpen}>
                        <MoreHorizButton/>
                    </IconButton>
                    <Menu
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