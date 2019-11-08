import React from "react";
import {  Switch, Route,Redirect,useLocation} from "react-router-dom";
import Login from './pages/login/login'
import Logout from './pages/login/logout.js'
import Home from './pages/home/home'
import Test from './pages/home/Test'
import {getUserData} from './utils/helps'

function App() {
  console.log("app组件加载");
  let location=useLocation()
  const isLogin=getUserData()

  function ABC(){
    return(
      <h2> 343434334</h2>
    )
  }

  return (
      <>
      <Switch>
        <Route  path='/login'>
          <Login />
        </Route>
       
        {isLogin?<Home/>:<Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
            />}

      </Switch>
      </>
  );
}

export default App;
