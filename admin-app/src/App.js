import React, { useEffect } from 'react';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Container/Home/index';
import SignIn from './Container/Signin/index';
import SignUp from './Container/Signup/index';
import PrivateRoute from './Component/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './actions'

import { Route, Switch } from "react-router-dom";

function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  // useEffect(() => {
  //   if (!auth.authenticate) {
  //     dispatch(isUserLoggedIn());
  //   }
  // }, []);

  return (
    <div className="App"> 
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Switch> 
    </div>
  );
}

export default App;
