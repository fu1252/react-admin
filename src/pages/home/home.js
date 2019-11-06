import React from 'react';
import {useHistory,Redirect,useLocation } from 'react-router-dom';
import {useStoreState} from 'easy-peasy'

function Home({children}){
  let history=useHistory()
  let location=useLocation()
  const isLogin=useStoreState(state=>state.user.isLogin)

  return(
    <div>
      <button className='custom-btn' onClick={()=>history.push('/login')}>登录 </button>
      {isLogin?children:<Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />}
      主页
    </div>
  )
}

export default Home