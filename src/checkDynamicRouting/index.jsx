import React, { Component } from "react";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ""
    };
  }
  componentDidMount() {
    this.setState({
      id: this.props.match.params.id
    });
  }
  render() {
    return (
      <div>
        <h1>The id you selected is {this.state.id}</h1>
      </div>
    );
  }
}

export default index;
