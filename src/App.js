import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { isLogin } from "@/utils/storage";
import PointLoading from "@/components/loading/loading";
import Home from '@/pages/home/home'

const Login = lazy(() => import("@/pages/login/login"));


function App() {
  let location = useLocation();

  return (
    <>
      <Switch>
        <Route path="/login">
          <Suspense fallback={<PointLoading />}>
            <Login />
          </Suspense>
        </Route>

        {isLogin() ? (
          <Home />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )}
      </Switch>
    </>
  );
}

export default App;
