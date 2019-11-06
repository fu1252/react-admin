import React from 'react';
import {useHistory } from 'react-router-dom'

function Home(){
  let history=useHistory()
  return(
    <div>
      <button className='custom-btn' onClick={()=>history.push('/login')}>再去登录 </button>
      主页的另一部分
    </div>
  )
}

export default Home