import { Switch, Route } from "react-router-dom";
import Welcome from "../Pages/Welcome";
import UserLogin from "../Pages/UserLogin";
import Register from "../Pages/Register";
import UserProfile from "../Pages/UserProfile";
import { useState } from "react";

function Routes() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Switch>
      <Route exact path="/UserLogin">
        <UserLogin
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route exact path="/Register">
        <Register authenticated={authenticated} />
      </Route>
      <Route exact path="/UserProfile">
        <UserProfile
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route exact path="/">
        <Welcome authenticated={authenticated} />
      </Route>
    </Switch>
  );
}
export default Routes;
