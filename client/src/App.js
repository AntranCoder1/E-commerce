import React from 'react';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Success from './pages/Success';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  const user = useSelector(state => state.user.currentUser);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/products/:category">
          <ProductList />
        </Route>
        <Route exact path="/product/:id">
          <Product />
        </Route>
        <Route exact path="/cart">
          { user ? <Cart /> : <Login /> }
        </Route>
        <Route exact path="/success">
          <Success />
        </Route>
        <Route exact path="/login">
          { user ? <Home /> : <Login /> }
        </Route>
        <Route exact path="/register">
          { user ? <Home /> : <Register /> }
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
