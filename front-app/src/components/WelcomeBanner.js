import React, { Component } from "react";

import Picturebanner from "./../images/peche-coupe.jpg";

class WelcomeBanner extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "#e6f7ff", height: "250px" }}>
        <img src={Picturebanner} alt="John" style={{ width: "100%" }} />
        <h4
          style={{
            margin: "0px",
            paddingTop: "8px",
            textAlign: "center",
            color: "#009682",
            fontSize: "22px",
            fontWeight: "bold"
          }}
        >
          La Marketplace de la pêche
        </h4>
        <h5
          style={{
            textAlign: "center"
          }}
        >
          <a style={{ color: "#009682" }} href="/s-inscrire">
            S'inscrire /{" "}
          </a>

          <a style={{ color: "#009682" }} href="/se-connecter">
            Se connecter
          </a>
        </h5>
      </div>
    );
  }
}

export default WelcomeBanner;
