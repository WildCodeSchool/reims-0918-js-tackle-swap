import { Navbar, NavItem } from "react-materialize";
import React from "react";
import avatar from "../pictures/avatar.png";

const NavBar = () => {
  return (
    <Navbar
      brand="Tackle Swap"
      right
      fixed
      style={{ backgroundColor: "#4e8e70" }}
    >
      <NavItem href="">
        <img
          src={avatar}
          height="70"
          width="70"
          className="mt-3"
          alt="profilphoto"
        />
      </NavItem>
      <NavItem href="" className="mt-5">
        Mon profil
      </NavItem>
      <NavItem href="">Rechercher</NavItem>
      <NavItem href="">Panier</NavItem>
      <NavItem href="">Historique des commandes</NavItem>
      <NavItem href="">Paramètres</NavItem>
      <NavItem href="">FAQ</NavItem>
    </Navbar>
  );
};

export default NavBar;
