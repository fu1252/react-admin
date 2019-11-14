import React from "react";
import {getLocalStorage} from '@/utils/helps'
import { useLocation,useHistory } from "react-router-dom";
import style from "./user.less";

function Form() {
  const account =getLocalStorage('account')
  const isUpload=useLocation().state.isUpload
  const action = useLocation().state.action;
  const actionText = action === "password" ? "密码" : "邮箱";
  console.log("TCL: Form -> isUpload", isUpload)
  console.log(1223,useHistory());
  
  function PwdorEmail() {
    return (
      <>
        <div className="title">
          请为您的账号{account.name}设置一个新{actionText}
        </div>
        <div className="input">
          {" "}
          {actionText} <input className="custom-input form-input" placeholder="输入密码" type="text" />
        </div>
      </>
    );
  }

  function Upload(){
    return(
      <>
      <h2>上传文件</h2>
      </>
    )
  }

  return (
    <div className={style.formWrapper}>
      <div className="header">{isUpload?'结算验核':`修改${actionText}`}</div>
        {isUpload?<Upload/>:<PwdorEmail actionText={actionText}/>}
      <button className="custom-btn form-btn">确定</button>
    </div>
  );
}

export default Form;
