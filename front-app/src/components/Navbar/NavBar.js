import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MenuIcon from "@material-ui/icons/Menu";
import ls from "local-storage";

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

    let list = [
      { id: 0, name: "Accueil", path: "/" },
      { id: 10, name: "Rechercher", path: "/" },
      { id: 20, name: "Message", path: "/" },
      { id: 30, name: "Profil", path: "/" },
      { id: 40, name: "Paramètres", path: "/" }
    ];

    if (ls.get("jwt-tackle-swap")) {
      list = [
        ...list,
        { id: 15, name: "Ajouter un article", path: "/ajouter-un-article" },
        { id: 99, name: "Se déconnecter", path: "/" }
      ];
    } else {
      list = [
        ...list,
        { id: 98, name: "Se connecter", path: "/se-connecter" },
        { id: 99, name: "S'inscrire", path: "/s-inscrire" }
      ];
    }
    const sideList = (
      <div className={classes.list}>
        <List>
          {list
            .sort((a, b) => a.id - b.id)
            .map((link, index) => (
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
