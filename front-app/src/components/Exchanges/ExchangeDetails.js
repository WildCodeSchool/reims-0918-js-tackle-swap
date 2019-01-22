import React, { Component, Fragment } from "react";
import { Button, Grid } from "@material-ui/core";
import ThumbnailMyExchange from "./ThumbnailMyExchange";
import { withRouter } from "react-router-dom";
import axios from "axios";
import ls from "local-storage";

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
        `${process.env.REACT_APP_URL_API}/swap/accept_exchange`,
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
      .then(results => {
        if (results.data.type === "error") {
          this.props.setFlashMessage(results.data.response.flashMessage);
        } else if (results.data.type === "success") {
          const flashMessage = results.data.response.flashMessage;
          axios
            .post(
              `${process.env.REACT_APP_URL_API}/sendMessages/accept_exchange/`,
              {
                id_article_annonce: this.state.swapDetails.annonce.id,
                id_owner_offer: this.state.swapDetails.offer.owner
              },
              {
                headers: {
                  accept: "application/json",
                  authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
                }
              }
            )
            .then(results => {
              if (results.data.type === "error") {
                this.props.setFlashMessage(results.data.response.flashMessage);
              } else if (results.data.type === "success") {
                this.props.setFlashMessage(flashMessage);
                this.props.history.push(
                  `/conversation-${results.data.response.room}`
                );
              }
            });
        }
      });
  }

  refuseTheProposition() {
    axios
      .put(
        `${process.env.REACT_APP_URL_API}/swap/refuse_exchange/`,
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
      .then(results => {
        if (results.data.type === "error") {
          this.props.setFlashMessage(results.data.response.flashMessage);
        } else if (results.data.type === "success") {
          const flashMessage = results.data.response.flashMessage;
          axios
            .post(
              `${process.env.REACT_APP_URL_API}/sendMessages/refuse_exchange/`,
              {
                id_article_annonce: this.state.swapDetails.annonce.id,
                id_owner_offer: this.state.swapDetails.offer.owner
              },
              {
                headers: {
                  accept: "application/json",
                  authorization: `Bearer ${ls.get("jwt-tackle-swap")}`
                }
              }
            )
            .then(results => {
              if (results.data.type === "error") {
                this.props.setFlashMessage(results.data.response.flashMessage);
              } else if (results.data.type === "success") {
                this.props.setFlashMessage(flashMessage);
                this.props.history.push(
                  `/conversation-${results.data.response.room}`
                );
              }
            });
        }
      });
  }
  goExchanges() {
    this.props.history.push("/mes-echanges/");
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          align: "center"
        }}
      >
        {this.state.swapDetails.annonce &&
          (this.state.swapDetails.annonce.owner !== this.props.user.id ? (
            <Fragment>
              <h1
                style={{
                  textAlign: "center",
                  color: "rgb(0, 150, 130)",
                  fontSize: "1.5em",
                  paddingTop: "15px",
                  margin: "0"
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
                        color: "rgba(0, 0, 0, 0.54)",
                        fontSize: "1.2em",
                        paddingTop: "2px"
                      }}
                    >
                      Article désiré
                    </h2>
                    <ThumbnailMyExchange
                      picture={this.state.swapDetails.annonce.picture}
                      name={this.state.swapDetails.annonce.name}
                      id={this.state.swapDetails.annonce.id}
                    />
                  </div>
                  <hr style={{ marginTop: "30px" }} />
                  <div>
                    <h2
                      style={{
                        textAlign: "center",
                        color: "rgba(0, 0, 0, 0.54)",
                        fontSize: "1.2em",
                        paddingTop: "12px"
                      }}
                    >
                      Votre proposition
                    </h2>
                    <ThumbnailMyExchange
                      picture={this.state.swapDetails.offer.picture}
                      name={this.state.swapDetails.offer.name}
                      id={this.state.swapDetails.offer.id}
                    />
                  </div>
                </Fragment>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <h1
                style={{
                  textAlign: "center",
                  color: "rgb(0, 150, 130)",
                  fontSize: "1.5em",
                  paddingTop: "15px",
                  margin: "0px"
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
                          color: "rgba(0, 0, 0, 0.54)",
                          fontSize: "1.2em",
                          paddingTop: "2px"
                        }}
                      >
                        Votre article
                      </h2>
                      <ThumbnailMyExchange
                        picture={this.state.swapDetails.annonce.picture}
                        name={this.state.swapDetails.annonce.name}
                        id={this.state.swapDetails.annonce.id}
                      />
                    </div>
                    <hr style={{ marginTop: "30px" }} />
                    <div>
                      <h2
                        style={{
                          textAlign: "center",
                          color: "rgba(0, 0, 0, 0.54)",
                          fontSize: "1.2em",
                          paddingTop: "2px"
                        }}
                      >
                        Article proposé en échange
                      </h2>
                      <ThumbnailMyExchange
                        picture={this.state.swapDetails.offer.picture}
                        name={this.state.swapDetails.offer.name}
                        id={this.state.swapDetails.offer.id}
                      />
                    </div>
                  </Fragment>
                )}
              </div>
            </Fragment>
          ))}
        <div
          style={{
            position: "fixed",
            bottom: "15px",
            width: "97%",
            padding: "5px"
          }}
        >
          <Grid
            container
            style={{
              position: "fixed",
              bottom: "10px",
              width: "93%"
            }}
          >
            <Grid container justify="space-around">
              {this.state.swapDetails.swap &&
                !this.state.swapDetails.swap.accepted &&
                !this.state.swapDetails.swap.refused &&
                this.state.swapDetails.annonce.owner === this.props.user.id && (
                  <>
                    <div style={{ margin: "0 auto" }}>
                      <Button
                        onClick={() => this.acceptTheProposition()}
                        style={{
                          backgroundColor: "#009682",
                          border: "0.5px solid #009682",
                          color: "white",
                          width: "49%",
                          float: "left",
                          height: "50px",
                          paddingTop: "3px"
                        }}
                      >
                        Accepter cette proposition
                      </Button>
                      <Button
                        onClick={() => this.refuseTheProposition()}
                        style={{
                          backgroundColor: "#009682",
                          border: "0.5px solid #009682",
                          color: "white",
                          width: "49%",
                          height: "50px",
                          float: "right",
                          paddingTop: "3px"
                        }}
                      >
                        Refuser cette proposition
                      </Button>
                    </div>
                  </>
                )}
              {this.state.swapDetails.swap &&
                (this.state.swapDetails.swap.accepted === 1 &&
                  (this.state.swapDetails.annonce.owner ===
                  this.props.user.id ? (
                    <p>Vous avez accepté l'échange</p>
                  ) : (
                    <p>Le propriétaire du leurre a accepté l'échange</p>
                  )))}
              {this.state.swapDetails.swap &&
                (this.state.swapDetails.swap.refused === 1 &&
                  (this.state.swapDetails.annonce.owner ===
                  this.props.user.id ? (
                    <p>Vous avez refusé l'échange</p>
                  ) : (
                    <p>Le propriétaire du leurre a refusé l'échange</p>
                  )))}
            </Grid>

            <div style={{ padding: "10px", margin: "0 auto" }}>
              <Button
                onClick={() => this.goToChat()}
                style={{
                  backgroundColor: "#009682",
                  border: "1px solid #009682",
                  display: "block",
                  color: "white",

                  width: "320px"
                }}
              >
                Aller à la conversation
              </Button>
            </div>
            <div style={{ margin: "0 auto" }}>
              <Button
                onClick={() => this.goExchanges()}
                style={{
                  backgroundColor: "#009682",
                  border: "1px solid #009682",
                  display: "block",
                  color: "white",
                  width: "320px"
                }}
              >
                Revenir aux échanges
              </Button>
            </div>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withRouter(ExchangeDetails);
