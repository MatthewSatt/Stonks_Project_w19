import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import LoginFormModal from './Login';
import SignUpFormModal from './SignUp';
import "./protectedRoute.css"

const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user)
  return (
    <Route {...props}>
      {(user) ? props.children : <div id="auth">
        <h2 id="mustLoginMsg">Must be logged in to view this page.</h2>
        <div id="formButtons">
          <LoginFormModal />
          <SignUpFormModal />
          <button className='authButton'>Demo</button>
        </div>
        </div>
      }
    </Route>
  )
};


export default ProtectedRoute;
