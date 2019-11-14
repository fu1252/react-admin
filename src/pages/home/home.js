import React, { lazy,useEffect } from "react";
import { Drawer, NavBar, Icon } from "antd-mobile";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import http from '@/http/http'
import {getLocalStorage,getSessionStorage,setSessionStorage } from "@/utils/storage";
import { useStoreState, useStoreActions } from "easy-peasy";
import style from "./home.less";

const About = lazy(() => import("@/pages/about/about"));
const User = lazy(() => import("@/pages/user/user"));
const Main = lazy(() => import("./main"));

function Home() {

  let history = useHistory();
  const isOpenSidebar = useStoreState(state => state.layout.isOpenSidebar);
  const toggleSidebar = useStoreActions(actions => actions.layout.toggleSidebar);

  const data = [
    { text: "销售数据" },
    { text: "设备管理" },
    { text: "商品管理" },
    { text: "订单管理" },
    { text: "账目管理" },
    { text: "会员管理" }
  ];

  useEffect(() => {
      async function getData() {
        const objectId = getLocalStorage('userData').object_id;
        const userInfoData=getSessionStorage('userInfo')
        if (userInfoData) {
          return;
        } else {
          const res = await http.get(`operators/${objectId}`);
          setSessionStorage('userInfo',res)
        }
      }
        getData();
  }, [])

  function sidebar() {
    return (
      <ul className={style.sidebarList}>
        <li className="username" onClick={() => history.push("/user")}>
          {" "}
          <span className="avatar"></span> test_free
        </li>
        {data.map(item => (
          <li className="listItem" key={item.text}>
            {item.text}
          </li>
        ))}
      </ul>
    );
  }

  function NotFound() {
    return <div className={style.notfound}>来到没有页面的沙漠地带</div>;
  }

  return (
    <div className={style.home}>
      <NavBar icon={<Icon type="ellipsis" />} onLeftClick={toggleSidebar}>
        导航
      </NavBar>
      <Drawer enableDragHandle sidebar={sidebar()} open={isOpenSidebar} onOpenChange={toggleSidebar}>
       
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route exact path="/home">
            <Main />
          </Route>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
        
      </Drawer>
    </div>
  );
}

export default Home;
