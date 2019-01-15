import React, { Component } from "react";
import Button from "@material-ui/core/Button";
// import ThumbnailExchange from "./ThumbnailExchange";
import { withRouter } from "react-router-dom";
import axios from "axios";
import ls from "local-storage";

const goBack = props => {
  props.history.goBack();
};

class ExchangeDetails extends Component {
  state = {
    swapDetails: []
  };
  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_URL_API}/details-swap-${
          this.props.match.params.id_swap
        }`,
        {
          headers: {
            Accept: "application/json",
            authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
          }
        }
      )
      .then(results =>
        this.setState({
          swapDetails: results.data.response.results[0]
        })
      );
  }
  render() {
    return (
      <div>
        <Button onClick={() => goBack(this.props)}>Retour</Button>
        <h1>Article voulu : {this.state.swapDetails.name_annonce}</h1>
        <h1>Article proposé : {this.state.swapDetails.name_offer}</h1>
        <Button>Conversation</Button>
      </div>
    );
  }
}

export default withRouter(ExchangeDetails);
