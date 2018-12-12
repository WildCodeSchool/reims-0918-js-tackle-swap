import React, { Component } from "react";
import { Link } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

export class SideLeftMenu extends Component {
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
    );
    return (
      <Drawer open={this.props.open} onClose={this.toggleDrawer(false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={this.toggleDrawer("left", false)}
          onKeyDown={this.toggleDrawer("left", false)}
        >
          {sideList}
        </div>
      </Drawer>
    );
  }
}

export default SideLeftMenu;
