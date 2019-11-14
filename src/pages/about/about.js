import React from 'react'
import { useHistory,} from "react-router-dom";


function About(){
  let history=useHistory()

  return (
   <div>
          <h2>我是about组件</h2>
          <button className='custom-btn' onClick={()=>history.push('/user')}>个人中心</button>
          <button className='custom-btn' onClick={()=>history.push('/login')}>登录</button>
   </div>
  )
}

export default About