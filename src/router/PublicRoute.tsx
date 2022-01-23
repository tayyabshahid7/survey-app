import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../utils/isLoggedIn";
import { IRoute } from "../interfaces/route";

const PublicRoute = (route: IRoute) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route

      path={route.path}
      render={(props: any) =>
        isLogin() && route.restricted ? (
          <Redirect to="/dashboard" />
        ) : (
          route.component && <route.component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
