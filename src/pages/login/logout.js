import React from 'react'
import {Toast} from 'antd-mobile'
import {useHistory} from "react-router-dom";


function Logout(){
let history=useHistory()

function submit(){
  localStorage.removeItem('userData')
  Toast.success('退出成功')
  setTimeout(() => {
    history.push('/login')
  }, 3000);
}

  return(
    <>
    <h2>你要退出登录？</h2>
    <button className='custom-btn' onClick={submit}>退出</button>
    </>
  )
}

export default Logout