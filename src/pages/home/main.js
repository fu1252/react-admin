import React,{useEffect} from 'react'
import {  Switch, Route,Redirect,useHistory,useLocation} from "react-router-dom";
import http from "../../http/http";
import {getUserData} from '@/utils/helps'


function Main(){
  let history=useHistory()
  let location=useLocation()
  console.log("TCL: Main -> location", location)

  useEffect(() => {
    async function getData(){
      const objectId=getUserData().object_id
      const res=await http.get(`operators/${objectId}`)
      console.log("TCL: getUserData -> res", res)
    }
    getData()
  }, [])

  return (
   <div>
          <h2>我是home组件</h2>
          <button className='custom-btn' onClick={()=>history.push('/about')}>去about</button>
   </div>
  )
}

export default Main