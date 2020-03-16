import React, { Component } from "react";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUrl: ""
    };
  }
  componentWillMount() {
    this.setState({
      fileUrl: this.props.match.params.fileUrl
    });
  }
  componentDidMount() {
    console.log(this.state.fileUrl);
  }
  render() {
    return (
      <div>
        <embed
          className="d-flex justify-content-center"
          type="application/pdf"
          width="100%"
          height="100%"
          src={this.state.fileUrl}
        />
      </div>
    );
  }
}
