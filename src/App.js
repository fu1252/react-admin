import React from "react";
import {  Switch, Route,Redirect,useLocation} from "react-router-dom";
import Login from './pages/login/login'
import Home from './pages/home/home'
import {getLocalStorage} from '@/utils/helps'

function App() {
  let location=useLocation()
  const userData=getLocalStorage('userData')
  console.log("TCL: App -> userData", userData)

  return (
      <>
      <Switch>
        <Route  path='/login'>
          <Login />
        </Route>
       
        {userData?<Home/>:<Redirect
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
