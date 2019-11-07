import axios from "axios";
import { Toast } from "antd-mobile";
import allApi from "../config.js";
import { getUserData } from "../utils/helps";

const service = axios.create({
  baseURL: allApi.api,
  timeout: 5000
});

service.interceptors.request.use(
  config => {
    console.log("TCL: config", config);
    if (getUserData()) {
      const time = getUserData().login_time;
      const difTime = new Date().getTime() - time > 1000 * 60 * 60 * 24;
      if (difTime) {
        Toast.fail("登录过期");
        localStorage.removeItem("userData");
        window.history.go("/");
      }
      config.headers["Authorization"] = `JWT ${getUserData().access_token}`;
    }
    if (config.headers.noNeedToken) {
      delete config.headers["Authorization"];
    }
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";
    return config;
  },
  error => {
    console.log(error);
    Toast.fail(error, 3);
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code) {
      Toast.fail(res.message);
      return Promise.reject(res.code);
    } else {
      return res;
    }
  },
  error => {
    console.log("err", error);
    Toast.fail(error, 3);
    return Promise.reject(error);
  }
);

export default service;
