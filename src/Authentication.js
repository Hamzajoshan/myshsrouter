import { Component } from "react";
import cookie from "react-cookies";

import LoginPanel from "./Secens/Login";
import Dashboard from "./Component/Dashboard";

class MyApp extends Component {
  constructor() {
    super();

    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  componentWillMount() {
    this.state = { userId: cookie.load("userId") };
  }

  onLogin(userId) {
    this.setState({ userId });
    cookie.save("userId", userId, { path: "/" });
  }

  onLogout() {
    cookie.remove("userId", { path: "/" });
  }

  render() {
    const { userId } = this.state;

    if (!userId) {
      return <LoginPanel onSuccess={this.onLogin} />;
    }

    return <Dashboard userId={userId} />;
  }
}
