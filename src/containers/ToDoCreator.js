import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import styles from './ToDoCreator.module.css';

class ToDoCreator extends Component {

    state = {
        toDoText: ""
    }

    handleTextChange = event => {
        this.setState({ toDoText: event.target.value });
    }

    handleToDoClear = () => {
        this.setState({ toDoText: "" });
    }

    handleSaveClick = () => {
        if (this.state.toDoText.length > 1) {
            this.props.onToDoCreate(this.state.toDoText);
            this.setState({ toDoText: "" });
        }
    }

    handleEnterPress = event => {
        if (event.key === 'Enter') {
            this.handleSaveClick();
        }
    }

    render() {
        return (
            <Card className={styles.card}>
                <CardActions>
                    <InputBase 
                        onKeyPress={this.handleEnterPress}
                        className={styles.inputField} 
                        placeholder="What would you like to do?"
                        value={this.state.toDoText}
                        onChange={this.handleTextChange}/>
                    <Button className={styles.saveButton}
                        size="small"
                        variant="contained" 
                        color="primary"
                        disabled={this.state.toDoText.length<2}
                        onClick={this.handleSaveClick}>
                        Save
                    </Button>
                    <div className={styles.closeButton}>
                        <IconButton 
                        disabled={this.state.toDoText.length===0}
                        onClick={this.handleToDoClear}>
                            <Close/>
                        </IconButton>
                    </div>        
                </CardActions>
            </Card>
        );
    }
}

export default ToDoCreator;