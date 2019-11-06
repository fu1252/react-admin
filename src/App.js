import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './pages/login/login'
import Home from './pages/home/home'
import HomeTwo from './pages/home/homeTwo'

function App() {
  console.log("app组件加载");

  return (
    <Router>
      <>
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/'>
          <Home>
          <HomeTwo/>
          </Home>
        </Route>
      </Switch>
      </>
    </Router>
  );
}

export default App;
