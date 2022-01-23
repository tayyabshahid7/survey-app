import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../utils/isLoggedIn";
import { IRoute } from "../interfaces/route";

const PrivateRoute = (route: IRoute) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      path={route.path}
      render={(props: any) =>
        isLogin() ? (
          route.component && (
            <route.component {...props} routes={route.routes} />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
