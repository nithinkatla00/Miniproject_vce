import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import userprofile from "./pages/Authorizedpages/UserProfile"
import { urlencoded } from "body-parser";

function AuthRoutes() {
  return (
    <div className="containerAuthroutes">
      <div className="main-title">
          <h3>Welcome to Palisade!</h3>
          <ul style={{marginTop:"40px",fontFamily:'Roboto Slab'}}>
            <li>Connect with people</li>
            <li>Rooms to discuss things and chat with new people</li>
            <li>we help you in finding blood donors</li>
            <li>very secured and easy to use</li>
          </ul>
          <div className="botimage">
            <img src={require("./public/p6.png")} width="250px" height="250px" style={{marginLeft:"60px"}} />
          </div>
      </div>
      <div className="switch-component">
        <Switch>
          <Route path="/login" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Redirect to="/login" />
        </Switch>
      </div>
    </div>
  );
}
export default AuthRoutes;
