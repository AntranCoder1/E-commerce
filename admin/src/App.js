import React from 'react';
import './app.css';
import SideBar from './components/sideBar/SideBar';
import Topbar from './components/topbar/Topbar';
import Home from './pages/Home/Home';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import UserList from './pages/userList/UserList';
import UserEdit from './pages/userEdit/UserEdit';
import userCreate from './pages/userCreate/userCreate';
import Product from './pages/product/Product';
import ProductEdit from './pages/productEdit/ProductEdit';
import NewProduct from './pages/newProduct/NewProduct';
import Login from './pages/login/Login';
import { useSelector } from "react-redux";

function App() {

  const admin = useSelector((state) => state.user.currentUser?.isAdmin);

  return (
    <Router>
      <switch>
        { admin ? (
          <>
            <Topbar />
            <div className="container">
              <SideBar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/users" component={UserList} />
                <Route exact path="/users/:userId" component={UserEdit} />
                <Route exact path="/create" component={userCreate} />
                <Route exact path="/products" component={Product} />
                <Route exact path="/products/:productId" component={ProductEdit} />
                <Route exact path="/newproduct" component={NewProduct} />
              </Switch>
            </div>
          </>
        ) : (
          <Route exact path="/" component={Login} />
        ) }
      </switch>
    </Router>
  );
}

export default App;
