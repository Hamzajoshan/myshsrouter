import React, { Component } from "react";

// the hoc
import { withNamespaces } from "react-i18next";
import "./index.css";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    //here i put the logic about total chat
    return (
      <div class="card-body msg_card_body">
        <div style={{ marginBottom: "100px" }}>
          <div
            class="text-center"
            style={{ color: "rgba(0,0,0,0.12)", paddingTop: "50%" }}
          >
            <span>
              <i
                class="fa fa-comments "
                style={{ color: "rgba(0,0,0,0.12)", fontSize: "128px" }}
              ></i>
            </span>
            <p style={{ color: "rgba(0,0,0,0.54)" }}>
              {this.props.t("select_chat")}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(index);
