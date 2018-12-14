import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
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
    marginRight: 20,
    color: "inherit"
  },
  logo: {
    padding: "5% 8%"
  },
  list: {
    backgroundColor: "#e6f7ff",
    height: "810px"
  },
  Title: {
    color: "#009682",
    textDecoration: "none"
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

  disconnect = e => {
    e.preventDefault();
    ls.clear();
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
              <ListItem button key={index} className={classes.Title}>
                {link.name === "Se déconnecter" ? (
                  <Link to={link.path} onClick={e => this.disconnect(e)}>
                    {link.name}
                  </Link>
                ) : (
                  <Link to={link.path}>{link.name}</Link>
                )}
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
              <MenuIcon style={{ fontSize: "40px" }} />
            </IconButton>

            <img
              src="http://image.noelshack.com/fichiers/2018/50/3/1544610771-logof-white.png"
              alt="Logo"
              width="40%"
              className={classes.logo}
            />
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
