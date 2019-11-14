import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { isLogin } from "@/utils/storage";
import PointLoading from "@/components/loading/loading";

const Home = lazy(() => import("@/pages/home/home"));
const Login = lazy(() => import("@/pages/login/login"));

function App() {

  let location = useLocation();

  return (
    <>
      <Suspense fallback={<PointLoading />}>
        <Switch>
          <Route path="/login">
            <Login />
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
      </Suspense>
    </>
  );
}

export default App;
