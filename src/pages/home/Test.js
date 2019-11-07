import React from 'react';
import {useHistory } from 'react-router-dom'

function Test(){
  let history=useHistory()
  return(
    <div>
      <button className='custom-btn' onClick={()=>history.push('/')}>主页 </button>
      我是测试页
    </div>
  )
}

export default Test