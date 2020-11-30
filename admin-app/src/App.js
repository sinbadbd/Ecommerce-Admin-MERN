import React from 'react';
import { BrowserRouter as Router,Route, Link, Switch } from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Container/Home/index';
import SignIn from './Container/Signin/index';
import SignUp from './Container/Signup/index';



function App() {
  return (
    <div className="App">
        <Router>
              <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/signin"component={SignIn}/>
                    <Route path="/signup"component={SignUp}/>
              </Switch>
        </Router>
    </div>
  );
}

export default App;
