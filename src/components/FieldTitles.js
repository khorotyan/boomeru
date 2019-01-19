import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import styles from './FieldTitles.module.css';

class FieldTitles extends Component {

    handleCreatedClick = () => {
        this.props.onCreatedClick();
    }

    handleUpdatedClick = () => {
        this.props.onUpdatedClick();
    }

    render() {
        return (
            this.props.show ? 
                <div className={styles.centralDiv}>
                    <Button 
                        style={{color: "#949494"}}
                        className={styles.createdButton} 
                        size="small"
                        onClick={this.handleCreatedClick}>
                        CREATED
                    </Button>
                    <Button 
                        style={{color: "#949494"}}
                        className={styles.updatedButton} 
                        size="small"
                        onClick={this.handleUpdatedClick}>
                        UPDATED
                    </Button>
                </div>
            : null  
        );
    }
}

export default FieldTitles;