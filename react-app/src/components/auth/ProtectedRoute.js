import React from 'react';
import { Route, Redirect } from 'react-router-dom';

//Prevents acces to wrapped route without authentication
const ProtectedRoute = props => {
  return (
    <Route {...props}>
      {(props.authenticated)? props.children  : <Redirect to="/login" />}
    </Route>
  )
};


export default ProtectedRoute;
