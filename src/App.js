import React from "react";
import {  Switch, Route,Redirect,useLocation} from "react-router-dom";
import Login from './pages/login/login'
import Home from './pages/home/home'
import Test from './pages/home/Test'
import {getUserData} from './utils/helps'

function App() {
  console.log("app组件加载");
  let location=useLocation()
  const isLogin=getUserData()
  return (
      <>
      <Switch>
      <Redirect exact from="/" to="/home" />
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/home'>
        {isLogin?<Home/>:<Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
            />}
        </Route>
        <Route exact path='/test'>
          <Test/>
        </Route>
      </Switch>
      </>
  );
}

export default App;
