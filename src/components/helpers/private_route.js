import React, { Component, useContext } from "react";
import { Route, Redirect } from "react-router-dom"
import { AuthContext  } from "../pages/auth_pages/auth_context";

const PrivateRoute = ({ component: Component, ...rest}) => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/home" />
        )
      }
    />
  );
};

export default PrivateRoute;
