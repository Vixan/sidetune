import React, { FC, PropsWithChildren } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

export const PrivateRoute: FC<PropsWithChildren<RouteProps>> = ({
  children,
  ...privateRouteProps
}) => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <></>
  }

  return (
    <Route {...privateRouteProps}>
      {user ? children : <Redirect to="/sign-in" />}
    </Route>
  );
};
