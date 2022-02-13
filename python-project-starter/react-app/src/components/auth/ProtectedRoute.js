import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import * as sessionActions from "../../store/session"
import LoginFormModal from './Login';
import SignUpFormModal from './SignUp';
import "./protectedRoute.css"

const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user)

  const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = async (e) => {
        await dispatch(sessionActions.login('demo@aa.io', 'password'))
        history.push('/home')
    }

  return (
    <Route {...props}>
      {(user) ? props.children : <div id="auth">
        <h2 id="mustLoginMsg">Must be logged in to view this page.</h2>
        <div id="formButtons">
          <LoginFormModal />
          <SignUpFormModal />
          <button onClick={handleClick} className='authButton'>Demo</button>
        </div>
        </div>
      }
    </Route>
  )
};


export default ProtectedRoute;
