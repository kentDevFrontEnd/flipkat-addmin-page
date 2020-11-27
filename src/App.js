import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import PrivateRoute from "./components/HOC/PrivateRoute";
import Dashboard from "./components/layout/Dashboard";
import Default from "./components/layout/Default";
import SignIn from "./components/layout/SignIn";
import SignUp from "./components/layout/SignUp";
import { isUserLogin } from "./redux/actions";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLogin());
    }
  }, [dispatch, auth]);
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route component={Default} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
