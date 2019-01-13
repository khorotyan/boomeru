import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizButton from '@material-ui/icons/MoreHoriz';
import styles from './FieldTitles.module.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const greyProvider = createMuiTheme({
    palette: {
      primary: grey
    },
});

class FieldTitles extends Component {
    render() {
        return (
            <div className={styles.centralDiv}>
                <MuiThemeProvider theme={greyProvider}>
                    <Button 
                        color="primary"
                        className={styles.createdButton} 
                        size="small">
                        CREATED
                    </Button>
                </MuiThemeProvider> 
                <MuiThemeProvider theme={greyProvider}>
                    <Button 
                        color="primary"
                        className={styles.updatedButton} 
                        size="small">
                        UPDATED
                    </Button>
                </MuiThemeProvider> 
                <MuiThemeProvider theme={greyProvider}>
                    <IconButton color="primary" className={styles.moreButton}>
                        <MoreHorizButton/>
                    </IconButton>
                </MuiThemeProvider> 
            </div>
        );
    }
}

export default FieldTitles;