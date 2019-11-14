import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import useForm from "react-hook-form";
import http from "../../http/http";
import { getLocalStorage, setLocalStorage } from "@/utils/storage";
import "./login.css";

function Login() {

  const account = getLocalStorage("account");
  const [showPWD, setShowPWD] = useState(false);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      name: account ? account.name : null,
      password: account ? account.password : null
    }
  });

  async function onSubmit(data, e) {
    delete data.isPartner;
    const res = await http({ url: "operators/login", data: data, method: "post", headers: { noNeedToken: true } });
    setLocalStorage("account", data);
    res.login_time = new Date().getTime();
    setLocalStorage("userData", res);
    history.replace(from);
  }

  return (
    <div>
      <button className="custom-btn" onClick={() => history.push("/")}>
        去主页
      </button>

      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          name="name"
          ref={register({ required: true })}
          placeholder="输入用户名"
          type="text"
          className="login-btn custom-input"
        />
        {errors.name && <div className="warn-text">请输入用户名</div>}
        <input
          placeholder="输入密码"
          name="password"
          ref={register({ required: true })}
          type={showPWD ? "text" : "password"}
          className="login-btn custom-input"
        />
        <span className="togglePWD" onClick={() => setShowPWD(!showPWD)}>
          {showPWD ? "密码隐藏" : "密码可见"}
        </span>
        {errors.password && <div className="warn-text">请输入密码 </div>}
        <div className="login-checkbox">
          <input type="checkbox" ref={register} name="isPartner" className="custom-checkbox" id="checkbox" />{" "}
          <label htmlFor="checkbox">我是子账号/合伙人</label>
        </div>
        <button className="custom-btn login-submit" type="submit">
          登录
        </button>
      </form>
    </div>
  );
}

export default Login;
