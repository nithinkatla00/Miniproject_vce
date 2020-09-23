import React from "react";
import * as Routes from "../Authorizedpages";
import Join from "../../components/Join/Join";
import Chat from "../../components/Chat/Chat";
import { Route, Switch, Redirect } from "react-router-dom";
function DashboardRoutes() {
  return (
    <Switch>
      <Redirect exact={true} from="/main" to="/dashboard" />
      <Route path="/dashboard" component={Routes["Dashboard"]} />
      <Route path="/posts" component={Routes["Posts"]} />
      <Route path="/createpost" component={Routes["CreatePost"]} />
      <Route exact path="/profile" component={Routes["Profile"]} />
      <Route exact path="/blooddonor" component={Routes["BloodGroups"]} />
      <Route exact path="/updateinfo" component={Routes["Updateinfo"]} />
      <Route
        path="/followingposts"
        component={Routes["Subscriberposts"]}
      />
      <Route exact path="/profile/:userid" component={Routes["UserProfile"]} />
      <Route path="/join" component={Join} />
      <Route path="/chat" component={Chat} />
      <Redirect to="/" />
    </Switch>
  );
}
export default DashboardRoutes;
