import React, { lazy, useEffect, useState } from "react";
import { Drawer, NavBar, Icon } from "antd-mobile";
import { Switch, Route, Redirect, useHistory, NavLink } from "react-router-dom";
import http from "@/http/http";
import { getLocalStorage, getSessionStorage, setSessionStorage } from "@/utils/storage";
import { useStoreState, useStoreActions } from "easy-peasy";
import style from "./home.less";
import classnames from "classnames";
import ReactSVG from "react-svg";

const About = lazy(() => import("@/pages/about/about"));
const User = lazy(() => import("@/pages/user/user"));
const Main = lazy(() => import("./main"));

function Home() {
  let history = useHistory();
  const isOpenSidebar = useStoreState(state => state.layout.isOpenSidebar);
  const role = useStoreState(state => state.user.userRole);
  const toggleSidebar = useStoreActions(actions => actions.layout.toggleSidebar);
  const [currentClickNav, setCurrentClickNav] = useState({show:false,member:false});
  console.log("TCL: Home -> currentClickNav", currentClickNav);

  const baseNavList = [
    { text: "销售数据", role: ["user", "admin"], icon: "saleTab", path: "sale" },
    { text: "设备管理", role: ["user", "admin"], icon: "machine", path: "machine" },
    { text: "商品管理", role: ["user", "admin"], icon: "shop", path:'abc',
    children: [
      { text: "礼物", role: ["admin"], icon: "order", path: "abc" },
      { text: "打折", role: ["admin"], icon: "account", path: "bbc" }
    ] },
    { text: "订单管理", role: ["admin"], icon: "order", path: "order" },
    { text: "账目管理", role: ["admin"], icon: "account", path: "account" },
    {
      text: "会员管理",
      role: ["admin"],
      icon: "member",
      path: "gift",
      children: [
        { text: "礼物", role: ["admin"], icon: "order", path: "gift" },
        { text: "打折", role: ["admin"], icon: "account", path: "profit" }
      ]
    }
  ];

  const navList = baseNavList.filter(item => item.role.includes(role));

  useEffect(() => {
    async function getData() {
      const objectId = getLocalStorage("userData").object_id;
      const userInfoData = getSessionStorage("userInfo");
      if (userInfoData) {
        return;
      } else {
        const res = await http.get(`operators/${objectId}`);
        setSessionStorage("userInfo", res);
      }
    }
    getData();
  }, []);

  function sidebar() {
    return (
      <ul className={style.sidebarList}>
        <li className="username" onClick={() => history.push("/user")}>
          {" "}
          <span className="avatar"></span> test_free
        </li>

        {navList.map(item => (
          <div key={item.text}>
            <NavLink exact  activeClassName="navActive" to={item.path}>
              <li  onClick={() => setCurrentClickNav({...currentClickNav,[item.path]:!currentClickNav[item.path]})}>
                <div className="listItem">
                  <ReactSVG className="inlineSVG" src={require(`@/assets/${item.icon}.svg`)} />
                  <span className="text">{item.text}</span>
                  {item.children && <ReactSVG className="inlineSVG" src={require(`@/assets/right.svg`)} />}
                </div>
              </li>
            </NavLink>
            {item.children &&<div className={classnames({'subList-hidden':currentClickNav[item.path]})}>
              {item.children.map(subitem => (
                <NavLink key={subitem.text} exact activeClassName="navActive" to={subitem.path}>
                  <li>
                    <div className="listItem">
                      <ReactSVG className="inlineSVG" src={require(`@/assets/${subitem.icon}.svg`)} />
                      <span className="text">{subitem.text}</span>
                    </div>
                    {subitem.children && <div className="subList">我是子元素</div>}
                  </li>
                </NavLink>
              ))}</div>}
          </div>
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
