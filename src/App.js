import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Category from "./components/container/category/Category";
import Home from "./components/container/home/Home";
import Order from "./components/container/orders/Order";
import Products from "./components/container/Products/Products";
import PrivateRoute from "./components/HOC/PrivateRoute";
import Default from "./components/layout/Default";
import SignIn from "./components/layout/SignIn";
import SignUp from "./components/layout/SignUp";
import { getInitialData, isUserLogin } from "./redux/actions";
import { getAllCategories } from "./redux/actions/category.action";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLogin());
    }

    dispatch(getInitialData());
  }, []);
  return (
    <React.Fragment>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/products" component={Products} />
        <PrivateRoute exact path="/category" component={Category} />
        <PrivateRoute exact path="/orders" component={Order} />

        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route component={Default} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
