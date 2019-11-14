import React,{useState,useEffect} from 'react'
import {useStoreActions} from 'easy-peasy'
import {Toast, } from 'antd-mobile'
import {useHistory,Route,Switch} from "react-router-dom";
import {getLocalStorage,getSessionStorage,setSessionStorage} from '@/utils/helps'

import http from "@/http/http";
import Form from './Form'
import style from './user.less'

function User (){
  console.log('user组件加载');
  let history=useHistory()
  const closeSidebar=useStoreActions(actions=>actions.user.closeSidebar)
  const userInfoData=getSessionStorage('userInfo')

  const userData=getLocalStorage('userData')
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    closeSidebar();
      async function getData(){
        const objectId=userData.object_id
        if(userInfoData){
          return
        }else{
        setIsLoading(true)
        const res=await http.get(`operators/${objectId}`)
        setIsLoading(false)
        setSessionStorage('userInfo',res)
        }
      }
      getData()
  }, [])

function submit(){
  localStorage.removeItem('userData')
  Toast.success('退出成功')
  setTimeout(() => {
    history.push('/login')
  }, 1000);
}

function changeName(){
 
}

function Main(){
  return (
    <div className={style.userWrapper}>
     
        {isLoading?'loading....':null}
      <div className='avatar'>
        <div className="left" onClick={changeName}></div>
        <div className="right">{userInfoData&&userInfoData.name}</div>
      </div>
      <ul>
        <li className="listItem" onClick={()=>history.push({pathname:'user/form',state:{action:'password'}})}>修改密码 <img className='custom-svg' src={require("@/assets/right.svg")} alt='jg'/> </li>
        <li className="listItem" onClick={()=>history.push({pathname:'user/form',state:{action:'email'}})}>修改邮箱 <img className='custom-svg' src={require("@/assets/right.svg")} alt='jg'/></li>
        <li className="listItem" onClick={()=>history.push({pathname:'user/form',state:{isUpload:true}})}>结算核验 <img className='custom-svg' src={require("@/assets/right.svg")} alt='jg'/></li>
      </ul>
    <button className='custom-btn user-btn' onClick={submit}>退出登录</button>
    </div>
  )
}


return(
  <><Switch>
  <Route exact path='/user'>
   <Main/>
  </Route>
  <Route exact path='/user/form'>
   <Form/>
  </Route>
  </Switch>
  </>
)
}
export default User