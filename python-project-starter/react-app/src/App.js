import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/Navigation';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import LoginFormModal from './components/auth/Login';
import SignUpFormModal from './components/auth/SignUp';
import Splash from './components/Splash'
import { Animation } from './components/Animation'
import { Canvas } from '@react-three/fiber';
import Portfolio from './components/Portfolio';
import StockDetail from './components/StockDetail';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        {/* Must make sure to add ProtectedRoute back to Routes we want a user to be logged in ot see, disabled for dev */}
        <ProtectedRoute path='/home' exact={true}>
          <Portfolio />
        </ProtectedRoute>

        <ProtectedRoute path='/stonk/:ticker' exact={true}>
          <StockDetail />
        </ProtectedRoute>

        <Route path='/' exact={true} >
          <Splash />
          <Suspense fallback='loding app...'>
            <Canvas
              id='canvas'
              camera={{ position: [100, 17.5, 0], fav: 50 }}
            >
              <Animation />
            </Canvas>
          </Suspense>
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
