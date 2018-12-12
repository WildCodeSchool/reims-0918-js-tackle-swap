import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MenuIcon from "@material-ui/icons/Menu";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class ButtonAppBar extends Component {
  state = {
    open: false
  };

  toggleDrawer = open => () => {
    this.setState({
      open
    });
  };
  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          {[
            { name: "Accueil", path: "/" },
            { name: "Rechercher", path: "/" },
            { name: "Ajouter un article", path: "/ajouter-un-article" },
            { name: "Message", path: "/" },
            { name: "Profil", path: "/" },
            { name: "Paramètres", path: "/" }
          ].map((link, index) => (
            <ListItem button key={index}>
              <Link to={link.path}>{link.name}</Link>
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar style={{ backgroundColor: "#009682" }} position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Tackle Swap
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
          <Drawer open={this.state.open} onClose={this.toggleDrawer(false)}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer(false)}
              onKeyDown={this.toggleDrawer(false)}
            >
              {sideList}
            </div>
          </Drawer>
        </div>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
