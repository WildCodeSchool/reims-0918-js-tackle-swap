import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import ThumbnailMyExchange from "./ThumbnailMyExchange";
import { withRouter } from "react-router-dom";
import axios from "axios";
import ls from "local-storage";

const goBack = props => {
  props.history.goBack();
};

class ExchangeDetails extends Component {
  state = {
    swapDetails: {}
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
          swapDetails: results.data.response
        })
      );
  }
  goToChat() {
    this.props.history.push(
      `/conversation-${this.state.swapDetails.annonce.id}-${
        this.state.swapDetails.annonce.owner
      }-${this.state.swapDetails.offer.owner}`
    );
  }

  acceptTheProposition() {
    axios
      .put(
        `${process.env.REACT_APP_URL_API}/confirmation-swap/`,
        {
          idAnnonce: this.state.swapDetails.annonce.id,
          idOffer: this.state.swapDetails.offer.id
        },
        {
          headers: {
            Accept: "application/json",
            authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
          }
        }
      )
      .then(results => console.log(results.data.response));
  }

  render() {
    return (
      <div>
        {this.state.swapDetails.annonce &&
          (this.state.swapDetails.annonce.owner !== this.props.user.id ? (
            <Fragment>
              <h1
                style={{
                  textAlign: "center",
                  color: "black",
                  width: "100%",
                  margin: "5px 0 20px 0",
                  padding: "5px 0 5px 0",
                  height: "40px",
                  borderRadius: "10px"
                }}
              >
                Détails de l'échange
              </h1>
              <div
                style={{
                  padding: "10px 5px 10px 5px",
                  borderRadius: "10px",

                  height: "100%"
                }}
              >
                <Fragment>
                  <div>
                    <h2
                      style={{
                        textAlign: "center",
                        color: "#212223",
                        width: "100%",
                        marginTop: "0",
                        borderRadius: "10px"
                      }}
                    >
                      Article désiré
                    </h2>
                    <ThumbnailMyExchange
                      picture={this.state.swapDetails.annonce.picture}
                      name={this.state.swapDetails.annonce.name}
                    />
                  </div>
                  <div>
                    <h2
                      style={{
                        textAlign: "center",
                        color: "#212223",
                        width: "100%",
                        borderRadius: "10px"
                      }}
                    >
                      Votre proposition
                    </h2>
                    <ThumbnailMyExchange
                      picture={this.state.swapDetails.offer.picture}
                      name={this.state.swapDetails.offer.name}
                    />
                  </div>
                  <div
                    style={{ position: "fixed", bottom: "15px", width: "97%" }}
                  >
                    <Button
                      onClick={() => this.goToChat()}
                      style={{
                        backgroundColor: "#009682",
                        border: "0.5px solid #009682",
                        color: "white",
                        width: "100%",
                        height: "50px"
                      }}
                    >
                      Aller à la conversation
                    </Button>
                    <Button
                      onClick={() => goBack(this.props)}
                      style={{
                        backgroundColor: "#009682",
                        border: "0.5px solid #009682",
                        color: "white",
                        width: "100%",
                        marginTop: "10px",
                        height: "50px"
                      }}
                    >
                      Revenir aux échanges
                    </Button>
                  </div>
                </Fragment>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <h1
                style={{
                  textAlign: "center",
                  color: "black",
                  width: "100%",
                  margin: "2px 0 10px 0",
                  padding: "5px 0 5px 0",
                  height: "40px",
                  borderRadius: "10px"
                }}
              >
                Détails de l'échange
              </h1>
              <div
                style={{
                  padding: "10px 5px 10px 5px",
                  borderRadius: "10px",
                  height: "100%"
                }}
              >
                {this.state.swapDetails.annonce && (
                  <Fragment>
                    <div>
                      <h2
                        style={{
                          textAlign: "center",
                          color: "#212223",
                          width: "100%",
                          marginTop: "0",
                          borderRadius: "10px"
                        }}
                      >
                        Votre article
                      </h2>
                      <ThumbnailMyExchange
                        picture={this.state.swapDetails.annonce.picture}
                        name={this.state.swapDetails.annonce.name}
                      />
                    </div>
                    <div>
                      <h2
                        style={{
                          textAlign: "center",
                          color: "#212223",
                          width: "100%",
                          borderRadius: "10px"
                        }}
                      >
                        Article proposé en échange
                      </h2>
                      <ThumbnailMyExchange
                        picture={this.state.swapDetails.offer.picture}
                        name={this.state.swapDetails.offer.name}
                      />
                    </div>
                    <div
                      style={{
                        position: "fixed",
                        bottom: "10px",
                        width: "97%"
                      }}
                    >
                      <Button
                        onClick={() => this.acceptTheProposition()}
                        style={{
                          backgroundColor: "#009682",
                          border: "0.5px solid #009682",
                          color: "white",
                          width: "100%",
                          height: "50px"
                        }}
                      >
                        Accepter cette proposition
                      </Button>
                      <Button
                        onClick={() => this.goToChat()}
                        style={{
                          backgroundColor: "#009682",
                          border: "0.5px solid #009682",
                          color: "white",
                          width: "100%",
                          height: "50px",
                          marginTop: "5px"
                        }}
                      >
                        Aller à la conversation
                      </Button>
                      <Button
                        onClick={() => goBack(this.props)}
                        style={{
                          backgroundColor: "#009682",
                          border: "0.5px solid #009682",
                          color: "white",
                          width: "100%",
                          marginTop: "5px",
                          height: "50px"
                        }}
                      >
                        Revenir aux échanges
                      </Button>
                    </div>
                  </Fragment>
                )}
              </div>
            </Fragment>
          ))}
      </div>
    );
  }
}

export default withRouter(ExchangeDetails);
