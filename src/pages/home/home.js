import React, { useState } from "react";
import { Drawer, NavBar, Icon } from "antd-mobile";
import {  Switch, Route,Redirect,useLocation,useHistory} from "react-router-dom";
import Main from './main'
import style from './home.less'

function Home() {
  let history=useHistory()
  const [isOpen, setIsOpen] = useState(false);

  function onOpenChange() {
    setIsOpen(!isOpen);
  }

  const data=[
    {text:'销售数据'},
    {text:'设备管理'},
    {text:'商品管理'},
    {text:'订单管理'},
    {text:'账目管理'},
    {text:'会员管理'},
  ]

  function sidebar(){
    return(
      <ul className={style.sidebarList}>
        <li className='username' onClick={()=>history.push('/logout')}> <span className="avatar"></span> test_free</li>
        {data.map(item=>(
          <li className='listItem' key={item.text}>{item.text}</li>
        ))}
      </ul>
    )
  }

  function About(){
    return(
      <div>
        我是abut页面
        <button className='custom-btn' onClick={()=>history.push('/people')}>people</button>
      </div>
    )
  }
  function People(){
    return(
      <div>
        我是people页面
        <button className='custom-btn' onClick={()=>history.push('/home')}>home</button>
        <div>
        <button className='custom-btn' onClick={()=>history.push('/login')}>login</button>
        </div>
      </div>
    )
  }

  function NotFound(){
    return(
      <div className={style.notfound}>
        来到没有页面的沙漠地带
      </div>
    )
  }


  return (
    <div className={style.home}>
      <NavBar icon={<Icon type="ellipsis"/>} onLeftClick={onOpenChange}>
        导航
      </NavBar>
      <Drawer  enableDragHandle sidebar={sidebar()} open={isOpen} onOpenChange={onOpenChange}>
        <Switch>
          <Redirect exact from='/' to='/home'/>
          <Route exact path="/home">
            <Main />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/people">
            <People />
          </Route>
          <Route >
          <NotFound/>
        </Route>
          </Switch>
 
      </Drawer>
    </div>
  );
}

export default Home;
