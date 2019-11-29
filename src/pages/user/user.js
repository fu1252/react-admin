import React, {  useEffect, lazy } from "react";
import { useStoreActions } from "easy-peasy";
import { Toast } from "antd-mobile";
import { useHistory, Route, Switch } from "react-router-dom";
import {getSessionStorage} from '@/utils/storage'
import style from "./user.less";

const Form = lazy(() => import("./Form"));

function User() {

  let history = useHistory();
  const closeSidebar = useStoreActions(actions => actions.layout.closeSidebar);
  const userInfoData=getSessionStorage('userInfo')

  useEffect(() => {
    closeSidebar();
  }, []);

  function submit() {
    localStorage.removeItem('userData')
    Toast.success("退出成功",2);
    setTimeout(() => {
      history.push("/login");
    }, 1000);
  }

  function Main() {
    return (
      <div className={style.userWrapper}>
        <div className="avatar">
          <div className="left" ></div>
          <div className="right">{userInfoData && userInfoData.name}</div>
        </div>

        <ul>
          <li
            className="listItem"
            onClick={() => history.push({ pathname: "user/form", state: { action: "password" } })}
          >
            修改密码 <img className="custom-svg" src={require("@/assets/svg/right.svg")} alt="jg" />{" "}
          </li>
          <li className="listItem" onClick={() => history.push({ pathname: "user/form", state: { action: "email" } })}>
            修改邮箱 <img className="custom-svg" src={require("@/assets/svg/right.svg")} alt="jg" />
          </li>
          <li className="listItem" onClick={() => history.push({ pathname: "user/form", state: { isUpload: true } })}>
            结算核验 <img className="custom-svg" src={require("@/assets/svg/right.svg")} alt="jg" />
          </li>
        </ul>

        <button className="custom-btn user-btn" onClick={submit}>
          退出登录
        </button>
      </div>
    );
  }

  return (
    <>
      <Switch>
        <Route exact path="/user">
          <Main />
        </Route>
        <Route exact path="/user/form">
          <Form />
        </Route>
      </Switch>
    </>
  );
}
export default User;
