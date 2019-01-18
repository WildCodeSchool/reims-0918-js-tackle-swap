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
    console.log("I agree with this proposition");
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
                    />
                  </div>
                  <div
                    style={{ position: "fixed", bottom: "15px", width: "97%" }}
                  >
                    <div style={{ padding: "5px" }}>
                      <Button
                        onClick={() => this.goToChat()}
                        style={{
                          backgroundColor: "#009682",
                          border: "1px solid #009682",
                          display: "block",
                          color: "white",
                          margin: "0 auto",
                          width: "320px"
                        }}
                      >
                        Aller à la conversation
                      </Button>
                    </div>
                    <Button
                      onClick={() => goBack(this.props)}
                      style={{
                        backgroundColor: "#009682",
                        border: "1px solid #009682",
                        display: "block",
                        color: "white",
                        margin: "0 auto",
                        width: "320px"
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
