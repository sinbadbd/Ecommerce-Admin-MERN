import React, { useEffect } from 'react';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Container/Home/index';
import SignIn from './Container/Signin/index';
import SignUp from './Container/Signup/index';
import PrivateRoute from './Component/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, getInitialData , getAllCategory} from './actions'

import { Route, Switch } from "react-router-dom";
import Products from './Container/Product/product';
import AddProduct from './Container/Product/addProduct';
import Orders from './Container/Order/Orders';
import Category from './Container/Category/category';

function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }

     dispatch(getInitialData());
    // dispatch(getAllCategory())
  }, []);

  return (
    <div className="App"> 
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        
        <PrivateRoute path="/category" component={Category} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/add-product" component={AddProduct} />
        <PrivateRoute path="/orders" component={Orders} />

        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Switch> 
    </div>
  );
}

export default App;
