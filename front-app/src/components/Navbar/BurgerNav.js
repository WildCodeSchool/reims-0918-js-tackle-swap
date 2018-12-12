import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MenuIcon from "@material-ui/icons/Menu";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

class BurgerNav extends React.Component {
  state = {
    left: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
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
      <div>
        <Button onClick={this.toggleDrawer("left", true)}>
          <MenuIcon />
        </Button>
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

BurgerNav.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BurgerNav);
