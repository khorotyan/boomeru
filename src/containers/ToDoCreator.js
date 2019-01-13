import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import styles from './ToDoCreator.module.css';

class ToDoCreator extends Component {
    render() {
        return (
            <Card className={styles.card}>
                <CardActions>
                    <InputBase 
                        className={styles.inputField} 
                        placeholder="What would you like to do?"/>
                    <Button className={styles.saveButton}
                        size="small"
                        variant="contained" 
                        color="primary"
                        disabled={true}>
                        Save
                    </Button>
                    <div className={styles.closeButton}>
                        <IconButton disabled={true}>
                            <Close/>
                        </IconButton>
                    </div>        
                </CardActions>
            </Card>
        );
    }
}

export default ToDoCreator;