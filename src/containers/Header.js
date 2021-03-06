import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Search from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import styles from "./Header.module.css";
import { Checkbox, ListItemText } from "@material-ui/core";
import StatusOptions from "../entities/StatusOptions";
import FilterOptions from "../entities/FilterOptions";

const allStatusOptions = [StatusOptions.Open, StatusOptions.Closed];

class Header extends Component {
  state = {
    statusSelector: {
      status: [StatusOptions.Open, StatusOptions.Closed],
      open: false
    },
    filterSelector: {
      filter: FilterOptions.None,
      open: false
    }
  };

  handleStatusChange = event => {
    let statusSelector = { ...this.state.statusSelector };
    statusSelector.status = event.target.value;
    statusSelector.open = false;

    this.props.onStatusChange(statusSelector.status);
    this.setState({ statusSelector });
  };

  handleStatusOpen = () => {
    let statusSelector = { ...this.state.statusSelector };
    statusSelector.open = true;

    this.setState({ statusSelector });
  };

  handleStatusClose = () => {
    let statusSelector = { ...this.state.statusSelector };
    statusSelector.open = false;

    this.setState({ statusSelector });
  };

  handleFilterChange = event => {
    let filterSelector = { ...this.state.filterSelector };
    const newFilter = event.target.value;
    filterSelector.filter = newFilter;
    filterSelector.open = false;

    this.props.onFilterChange(newFilter);

    this.setState({ filterSelector });
  };

  handleFilterOpen = () => {
    let filterSelector = { ...this.state.filterSelector };
    filterSelector.open = true;

    this.setState({ filterSelector });
  };

  handleFilterClose = () => {
    let filterSelector = { ...this.state.filterSelector };
    filterSelector.open = false;

    this.setState({ filterSelector });
  };

  handleSearchTextChange = event => {
    this.props.onSearchTextChange(event.target.value);
  };

  render() {
    return (
      <AppBar position="relative">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Toolbar className={styles.headerWrapper}>
            <Typography
              style={{ userSelect: "none", cursor: "pointer" }}
              className={styles.pageName}
              variant="h6"
              color="inherit"
              noWrap
              onClick={() => window.location.reload()}
            >
              Boomeru
            </Typography>
            <div className={styles.searchWrapper}>
              <Paper className={styles.searchRoot} elevation={1}>
                <InputBase
                  className={styles.searchInput}
                  placeholder="Search..."
                  onChange={this.handleSearchTextChange}
                />
                <IconButton className={styles.searchButton} aria-label="Search">
                  <Search fontSize="small" />
                </IconButton>
              </Paper>
              <FormControl className={styles.filterSelector}>
                <InputLabel style={{ color: "#ffffff" }}>Filter</InputLabel>
                <Select
                  style={{ color: "#ffffff" }}
                  className={styles.selectorWidth}
                  open={this.state.filterSelector.open}
                  onOpen={this.handleFilterOpen}
                  onClose={this.handleFilterClose}
                  value={this.state.filterSelector.filter}
                  onChange={this.handleFilterChange}
                >
                  <MenuItem value={FilterOptions.None}>
                    {FilterOptions.None}
                  </MenuItem>
                  <MenuItem value={FilterOptions.Recurring}>
                    {FilterOptions.Recurring}
                  </MenuItem>
                  <MenuItem value={FilterOptions.Archived}>
                    {FilterOptions.Archived}
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl className={styles.statusSelector}>
                <InputLabel style={{ color: "#ffffff" }}>Status</InputLabel>
                <Select
                  multiple
                  style={{ color: "#ffffff" }}
                  className={styles.selectorWidth}
                  open={this.state.statusSelector.open}
                  onOpen={this.handleStatusOpen}
                  onClose={this.handleStatusClose}
                  value={this.state.statusSelector.status}
                  renderValue={selected => selected.join(", ")}
                  onChange={this.handleStatusChange}
                >
                  {allStatusOptions.map(statusOption => (
                    <MenuItem key={statusOption} value={statusOption}>
                      <Checkbox
                        checked={
                          this.state.statusSelector.status.indexOf(
                            statusOption
                          ) > -1
                        }
                      />
                      <ListItemText primary={statusOption} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Toolbar>
          <Toolbar className={styles.mobileSearch}>
            <Paper className={styles.mobileSearchPaper}>
              <InputBase
                className={styles.mobileSearchBase}
                placeholder="Search..."
                onChange={this.handleSearchTextChange}
              />
              <IconButton
                className={styles.mobileSearchIcon}
                aria-label="Search"
              >
                <Search fontSize="small" />
              </IconButton>
            </Paper>
          </Toolbar>
        </div>
      </AppBar>
    );
  }
}

export default Header;
