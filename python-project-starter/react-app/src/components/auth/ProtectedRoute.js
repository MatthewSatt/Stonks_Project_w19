import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import LoginForm from './Login/LoginForm';

const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user)
  return (
    <Route {...props}>
      {(user) ? props.children : <LoginForm />}
    </Route>
  )
};


export default ProtectedRoute;
