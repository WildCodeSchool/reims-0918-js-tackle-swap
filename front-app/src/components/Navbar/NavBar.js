import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import MailIcon from "@material-ui/icons/Mail";
import CompareArrows from "@material-ui/icons/CompareArrows";
import PowerIcon from "@material-ui/icons/Power";
import CreateIcon from "@material-ui/icons/Create";
import PowerOffIcon from "@material-ui/icons/PowerOff";
import AddCartIcon from "@material-ui/icons/AddShoppingCart";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { withRouter } from "react-router-dom";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MenuIcon from "@material-ui/icons/Menu";
import ls from "local-storage";
import axios from "axios";

import avatar from "./../../images/avatar.png";
import logo from "./../../images/LogoF-white.png";
import isConnected from "../../functions/isConnected";

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
    marginTop: 8,
    color: "inherit"
  },
  logo: {
    paddingRight: "100px",
    padding: "3%",
    maxHeight: "100%"
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
    open: false,
    messageNotRead: 0
  };

  _isMounted = false;
  socket = this.props.socket;
  toggleDrawer = open => () => {
    this.setState({
      open
    });
  };

  disconnect = e => {
    e.preventDefault();
    ls.clear();
    this.props.setFlashMessage({
      message: "Vous êtes bien déconnecté",
      type: "success"
    });
    this.props.setUserArticles({});
    this.props.setUserInformation({});
    this.props.history.push("/");
  };

  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;
    if (isConnected() && !this.props.user.id) {
      axios
        .get(`${process.env.REACT_APP_URL_API}/personnal-informations`, {
          headers: {
            Accept: "application/json",
            authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
          }
        })
        .then(results => {
          this.props.setUserInformation(results.data.response);
        });
    }
    if (isConnected() && !this.props.userArticles) {
      axios
        .get(`${process.env.REACT_APP_URL_API}/user_articles`, {
          headers: {
            Accept: "application/json",
            authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
          }
        })
        .then(results => {
          this.props.setUserArticles(results.data.response);
        });
    }
    if (isConnected()) {
      this.socket.emit("haveMessage");
      this.socket.on("messageNotRead", messageNotRead => {
        if (this._isMounted) {
          if (messageNotRead.type === "error") {
            console.log("STOP ERROR", messageNotRead.message);
          } else {
            if (messageNotRead) {
              axios
                .get(
                  `${
                    process.env.REACT_APP_URL_API
                  }/notifications/messages_not_read/`,
                  {
                    headers: {
                      Accept: "application/json",
                      authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
                    }
                  }
                )
                .then(results => {
                  this.setState({ messageNotRead: results.data.response });
                });
            }
          }
        }
      });
    }
  }
  render() {
    const { classes } = this.props;

    let list = [{ id: 0, name: "Accueil", path: "/", icon: <HomeIcon /> }];

    if (ls.get("jwt-tackle-swap")) {
      list = [
        ...list,
        {
          id: 15,
          name: "Ajouter un article",
          path: "/ajouter-un-article",
          icon: <AddCartIcon />
        },
        {
          id: 20,
          name: "Messages",
          path: "/messagerie",
          icon: this.state.messageNotRead ? (
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  right: -5,
                  top: -5,
                  width: 15,
                  height: 15,
                  borderRadius: "50%",
                  backgroundColor: "red",
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                  paddingTop: 2,
                  fontSize: 12
                }}
              >
                {this.state.messageNotRead}
              </div>
              <MailIcon />
            </div>
          ) : (
            <MailIcon />
          )
        },
        {
          id: 25,
          name: "Mes Echanges",
          path: "/mes-echanges",
          icon: <CompareArrows />
        },
        {
          id: 27,
          name: "Mes Articles",
          path: "/mes-articles",
          icon: <AccountCircle />
        },
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
        <p
          style={{
            color: "rgb(0,204,204)",
            fontSize: "17px",
            fontWeight: "bold",
            margin: "0"
          }}
        >
          {this.props.user.nickname}
        </p>
        <hr style={{ borderTop: "1px solid rgba(0,204,204, 0.5)" }} />
        <List>
          {list
            .sort((a, b) => a.id - b.id)
            .map((link, index) => (
              <div key={index}>
                {link.name === "Se déconnecter" ? (
                  <Link
                    to={link.path}
                    onClick={e => this.disconnect(e)}
                    className={classes.Title}
                  >
                    <ListItem button>
                      <ListItemIcon>{link.icon}</ListItemIcon>
                      {link.name}
                    </ListItem>
                  </Link>
                ) : (
                  <Link to={link.path} className={classes.Title}>
                    <ListItem button>
                      <ListItemIcon>{link.icon}</ListItemIcon>
                      {link.name}
                    </ListItem>
                  </Link>
                )}
              </div>
            ))}
        </List>
        <a
          href="https://www.ikoula.com"
          title="Ikoula Hébergement web, serveurs dédiés et solutions sur mesure"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            style={{ height: "40px" }}
            src="https://www.ikoula.com/img/hosted_by_ikoula_150_blanc.png"
            alt="Ikoula"
            border="0"
          />
        </a>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar
          style={{
            backgroundColor: "#009682",
            minHeight: "80px",
            maxHeight: "80px"
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
              {this.state.messageNotRead ? (
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      right: -5,
                      top: -5,
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor: "red",
                      color: "white",
                      fontWeight: "bold",
                      paddingTop: 2,
                      fontSize: 15
                    }}
                  >
                    {this.state.messageNotRead}
                  </div>
                  <MenuIcon style={{ fontSize: "40px" }} />
                </div>
              ) : (
                <MenuIcon style={{ fontSize: "40px" }} />
              )}
            </IconButton>
            <div style={{ height: "60px", paddingTop: 5, margin: "0 auto" }}>
              <img src={logo} alt="Logo" className={classes.logo} />
            </div>
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

export default withRouter(withStyles(styles)(ButtonAppBar));
