import React, { useState } from "react";
import { useHistory, Switch, Route, useLocation } from "react-router-dom";
// import useForm from "react-hook-form";
import http from "@/utils/http";
import classNames from "classnames";
import ReactSVG from "react-svg";
import { getLocalStorage, setLocalStorage } from "@/utils/storage";
import style from "./login.less";

function LoginWrap() {
  console.log("login");
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const account = getLocalStorage("account");

  function Form() {
    async function onSubmit(e) {
      e.preventDefault();
      const data = { name: name, password: pwd };
      // 用户名验证
      if (data.name === "") {
        setNameError({ isError: true, errorType: "noValue" });
        return;
      }
      if (data.name === "abc") {
        setNameError({ isError: true, errorType: "errorValue" });
        setName("");
        return;
      }
      // 密码验证
      if (data.password === "") {
        setPwdError({ isError: true, errorType: "noValue" });
        return;
      }
      if (data.password === "abc") {
        setPwdError({ isError: true, errorType: "errorValue" });
        setPwd("");
        return;
      }

      console.log("TCL: onSubmit -> data", data);
      const res = await http({ url: "operators/login", data: data, method: "post", headers: { noNeedToken: true } });
      setLocalStorage("account", data);
      res.login_time = new Date().getTime();
      setLocalStorage("userData", res);
      history.replace(from);
    }
    const [showPWD, setShowPWD] = useState(false);
    const [ischeck, setIscheck] = useState(false);
    // 用户名验证
    const [name, setName] = useState(account ? account.name : "");
    const [nameError, setNameError] = useState({ isError: false, errorType: "noValue" });
    const nameInfo = { noValue: "请输入用户名", errorValue: "输入错误", placeholderText: "输入用户名" };
    function handleInputText(e) {
      setNameError(false);
      setName(e.target.value);
    }
    // 密码验证
    const [pwd, setPwd] = useState(account ? account.password : "");
    const [pwdError, setPwdError] = useState({ isError: false, errorType: "noValue" });
    const pwdInfo = { noValue: "请输入密码", errorValue: "输入错误", placeholderText: "输入密码" };
    function handleInputPwd(e) {
      setPwdError(false);
      setPwd(e.target.value);
    }

    return (
      <>
        <form onSubmit={onSubmit}>
          <input
            placeholder={nameError.isError ? nameInfo[nameError.errorType] : nameInfo.placeholderText}
            type="text"
            value={name}
            onChange={handleInputText}
            className={classNames({ "login-btn": true, "custom-input": true, error: nameError.isError })}
          />
          <div className="pwdWrap">
            <input
              placeholder={pwdError.isError ? pwdInfo[pwdError.errorType] : pwdInfo.placeholderText}
              value={pwd}
              onChange={handleInputPwd}
              type={showPWD ? "text" : "password"}
              className={classNames({ "login-btn": true, "custom-input": true, error: pwdError.isError })}
            />
            <ReactSVG
              onClick={() => setShowPWD(!showPWD)}
              className="togglePWD"
              src={showPWD ? require("@/assets/svg/showSecret.svg") : require("@/assets/svg/hideSecret.svg")}
            />
          </div>

          <div className="bottom-wrapper">
            <div className="login-checkbox">
              <input
                type="checkbox"
                value={ischeck}
                onChange={e => setIscheck(e.target.value)}
                name="isPartner"
                className="custom-checkbox"
                id="checkbox"
              />
              <label htmlFor="checkbox">我是子账号/合伙人</label>
            </div>
            <span className="forgetPWD" onClick={() => history.push("/login/forgetPWD")}>
              忘记密码
            </span>
          </div>
          <button onClick={onSubmit} className="custom-btn login-submit" type="submit">
            登录
          </button>
        </form>
      </>
    );
  }

  function Login() {
    return (
      <div className={style.loginWrapper}>
        <div className={style.container}>
          <div className="header">运营管理系统</div>
          <Form />
        </div>
      </div>
    );
  }

  function ForgetPWD() {
    return (
      <div className={style.forgetPWDWrapper}>
        <h2>aaaaaa</h2>
      </div>
    );
  }

  return (
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/login/forgetPWD">
        <ForgetPWD />
      </Route>
    </Switch>
  );
}

export default LoginWrap;
