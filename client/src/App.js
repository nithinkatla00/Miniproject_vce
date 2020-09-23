import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Home from "./pages/Home";
import AuthRoutes from "./pages/Authorizedpages/Routes";
import { AuthorizedRoutes } from "./components/AuthorizedComponent";
import { withRouter } from 'react-router-dom';
import "./App.css";
import "./public/public.css";

function App(props) {
  console.log(props)
  return (
    <div className="App">
      {props.match.path!="/dashboard"?<Header />:null}
      <div className="bodypart">
        <Switch>
          <Route exact path="/" component={Home} />
          <AuthorizedRoutes exact component={AuthRoutes} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default withRouter(App);
