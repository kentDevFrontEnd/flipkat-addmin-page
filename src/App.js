import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import PrivateRoute from "./components/HOC/PrivateRoute";
import Dashboard from "./components/layout/Dashboard";
import Default from "./components/layout/Default";
import SignIn from "./components/layout/SignIn";
import SignUp from "./components/layout/SignUp";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route component={Default} />
      </Switch>
    </Router>
  );
}

export default App;
