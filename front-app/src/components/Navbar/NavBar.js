import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import MailIcon from "@material-ui/icons/Mail";
import FaceIcon from "@material-ui/icons/Face";
import CompareArrows from "@material-ui/icons/CompareArrows";
import SettingsIcon from "@material-ui/icons/Settings";
import PowerIcon from "@material-ui/icons/Power";
import CreateIcon from "@material-ui/icons/Create";
import PowerOffIcon from "@material-ui/icons/PowerOff";
import AddCartIcon from "@material-ui/icons/AddShoppingCart";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MenuIcon from "@material-ui/icons/Menu";
import ls from "local-storage";

import avatar from "./../../images/avatar.png";
import logo from "./../../images/LogoF-white.png";

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
    paddingRight: "120px",
    padding: "2%",
    margin: "0 auto",
    maxWidth: "35%"
  },
  list: {
    backgroundColor: "#e6f7ff",
    height: "810px",
    textAlign: "center"
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
      { id: 0, name: "Accueil", path: "/", icon: <HomeIcon /> },
      { id: 10, name: "Rechercher", path: "/", icon: <SearchIcon /> },
      { id: 40, name: "Paramètres", path: "/", icon: <SettingsIcon /> }
    ];

    if (ls.get("jwt-tackle-swap")) {
      list = [
        ...list,
        {
          id: 15,
          name: "Ajouter un article",
          path: "/ajouter-un-article",
          icon: <AddCartIcon />
        },
        { id: 20, name: "Messages", path: "/messagerie", icon: <MailIcon /> },
        {
          id: 25,
          name: "Mes Echanges",
          path: "/mes-echanges",
          icon: <CompareArrows />
        },
        { id: 30, name: "Profil", path: "/profil", icon: <FaceIcon /> },
        { id: 99, name: "Se déconnecter", path: "/", icon: <PowerOffIcon /> }
      ];
    } else {
      list = [
        ...list,
        {
          id: 98,
          name: "Se connecter",
          path: "/se-connecter",
          icon: <PowerIcon />
        },
        {
          id: 99,
          name: "S'inscrire",
          path: "/s-inscrire",
          icon: <CreateIcon />
        }
      ];
    }
    const sideList = (
      <div className={classes.list}>
        <img src={avatar} alt="profil" />
        <List>
          {list
            .sort((a, b) => a.id - b.id)
            .map((link, index) => (
              <ListItem button key={index}>
                <ListItemIcon>{link.icon}</ListItemIcon>

                {link.name === "Se déconnecter" ? (
                  <Link
                    to={link.path}
                    onClick={e => this.disconnect(e)}
                    className={classes.Title}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <Link to={link.path} className={classes.Title}>
                    {link.name}
                  </Link>
                )}
              </ListItem>
            ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar
          style={{
            backgroundColor: "#009682",
            minHeight: "70px",
            maxHeight: "70px"
          }}
          position="fixed"
        >
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.toggleDrawer(true)}
            >
              <MenuIcon style={{ fontSize: "40px" }} />
            </IconButton>
            <img src={logo} alt="Logo" className={classes.logo} />
          </Toolbar>
        </AppBar>
        <div>
          <Drawer open={this.state.open} onClose={this.toggleDrawer(false)}>
            <div
              className={classes.Title}
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
