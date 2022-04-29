import React from "react";

import { Navigate } from "react-router-dom";

export const PublicRoute = ({ isAuthenticated, children }) => {
  if(isAuthenticated) {
    return <Navigate to='/' />
  } else {
    return children
  }
};
