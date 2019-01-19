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
    'Make recurring',
    'Archive',
    'Delete'
];

const DUPLICATE_OPTION_INDEX = 0;
const RECURRING_OPTION_INDEX = 1;
const ARCHIVE_OPTION_INDEX = 2;
const DELETE_OPTION_INDEX = 3;

const UNDO_RECURRING_OPTION = 'Undo recurring';
const UNARCHIVE_OPTION = 'Unarchive';

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
            case moreOptions[DUPLICATE_OPTION_INDEX]:
                this.props.onItemDuplicateClick();
                break;
            case moreOptions[RECURRING_OPTION_INDEX]:
            case UNDO_RECURRING_OPTION:
                this.props.onItemRecurringClick();
                break;
            case moreOptions[ARCHIVE_OPTION_INDEX]:
            case UNARCHIVE_OPTION:
                this.props.onItemArchiveClick();
                break;
            case moreOptions[DELETE_OPTION_INDEX]:
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

    getCurrentMoreOption = (option, index) => {
        const isRecurring = this.props.isRecurring;
        const isArchived = this.props.isArchived;

        if (index === RECURRING_OPTION_INDEX && isRecurring) {
            return UNDO_RECURRING_OPTION;
        } else if (index === ARCHIVE_OPTION_INDEX && isArchived) {
            return UNARCHIVE_OPTION;
        } else {
            return option;
        }
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
                        {moreOptions.map((option, index) => (
                            <MenuItem key={option} onClick={this.handleMoreClick}>
                                {this.getCurrentMoreOption(option, index)}
                            </MenuItem>
                        ))}
                    </Menu>
                </CardActions>
            </Card>
        );
    }
}

export default ToDoItem;