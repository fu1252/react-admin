import React from 'react'
import { useHistory,useLocation} from "react-router-dom";
import { useStoreState, useStoreActions, action } from "easy-peasy";


function About(){
  let history=useHistory()
  const role = useStoreState(state => state.user.userRole);
  const changeRole=useStoreActions(actions=>actions.user.changeRole)

if(role==='user'){return(
  <h1>您没有权限访问这个页面</h1>
)}
  return (
   <div>
          <h2>我是about组件</h2>
          <div>
          <button className='custom-btn' onClick={()=>changeRole('user')}>切换权限</button>
          </div>
          <button className='custom-btn' onClick={()=>history.push('/user')}>个人中心</button>
          <button className='custom-btn' onClick={()=>history.push('/login')}>登录</button>
   </div>
  )
}

export default About