import React from 'react'
import {useHistory } from 'react-router-dom'

function Login(){
  let history =useHistory()

  return(
    <div>
     <button className='custom-btn' onClick={()=>history.push('/')}>去主页</button>
      登录
    </div>
  )
}

export default Login