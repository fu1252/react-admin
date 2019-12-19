import React, { lazy, Suspense } from "react";
import PointLoading from "@/components/loading/loading";
import { Switch, Route, Redirect } from "react-router-dom";
import Chart from '@/pages/chart/chart'

const About = lazy(() => import('@/pages/about/about'))
const User = lazy(() => import('@/pages/user/user'))
const Main = lazy(() => import('./main'))

function RouteConfig() {
  
  // 未匹配路由页面
  function NotFound() {
    return <h1>来到没有页面的沙漠地带</h1>;
  }

  return (
    <Suspense fallback={<PointLoading />}>
      <Switch>

        <Redirect exact from="/" to="/home" />
        

        <Route exact path="/home">
            <Main />
          </Route>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/chart">
            <Chart />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route>
            <NotFound />
          </Route>
        
      </Switch>
    </Suspense>
  );
}

export default RouteConfig;
