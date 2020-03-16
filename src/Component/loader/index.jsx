import React, { Component } from "react";
import "./index.css";
import Loader from "react-loader-spinner";
export default class index extends Component {
  render() {
    return (
      <div>
        <Loader
          type="Puff"
          color="#00BFFF"
          height={50}
          width={50}
          className="react-loader-npm"
          timeout={300000} //3 secs
        />
      </div>
    );
  }
}
