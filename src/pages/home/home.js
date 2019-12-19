import React, {  useEffect, useState } from 'react'
import { Drawer, NavBar, Icon } from 'antd-mobile'
import { useHistory,useLocation } from 'react-router-dom'
import http from '@/utils/http'
import { getLocalStorage, getSessionStorage, setSessionStorage } from '@/utils/storage'
import { useStoreState, useStoreActions } from 'easy-peasy'
import style from './home.less'
import classnames from 'classnames'
import ReactSVG from 'react-svg'
import Route from './route'
import listData from '@/permission/navList'


function Home() {
  let history = useHistory()
  let location=useLocation()
  const isOpenSidebar = useStoreState(state => state.layout.isOpenSidebar)
  const toggleSidebar = useStoreActions(actions => actions.layout.toggleSidebar)
  const [currentClickNav, setCurrentClickNav] = useState({})
  console.log('TCL: Home -> currentClickNav', currentClickNav)

  

  useEffect(() => {
    async function getData() {
      const objectId = getLocalStorage('userData').object_id
      const userInfoData = getSessionStorage('userInfo')
      if (userInfoData) {
        return
      } else {
        const res = await http.get(`operators/${objectId}`)
        setSessionStorage('userInfo', res)
      }
    }
    getData()
  }, [])

  function onListClick(item){
    if(item.children){
      setCurrentClickNav({ ...currentClickNav, [item.key]: !currentClickNav[item.key] })
    }else{
      history.push(item.path)
    }
  }

  function listEle(data) {
    return (
      data.map(item => (
        <div key={item.text} >
          <li onClick={() =>onListClick(item) }>
            <div className={classnames({listItem:true,navActive:location.pathname==item.path})}>
              <ReactSVG className="inlineSVG" src={require(`@/assets/svg/${item.icon}.svg`)} />
              <span className="text">{item.text}</span>
              {item.children && <ReactSVG  className={classnames({inlineSVG:true,
                'icon-open':currentClickNav[item.key]
              })} src={require('@/assets/svg/right.svg')} />}
            </div>
          </li>
          {item.children &&<div className={classnames({
            'subList-hidden':!currentClickNav[item.key]
          })}> {listEle(item.children)}</div>}
        </div>
      ))
    )
  }

  function sidebar() {
    return (
      <ul className={style.sidebarList}>
        <li className="username" onClick={() => history.push('/user')}>
          {' '}
          <span className="avatar"></span> test_free
        </li>
        {listEle(listData)}
      </ul>
    )
  }


  return (
    <div className={style.home}>
      <NavBar icon={<Icon type="ellipsis" />} onLeftClick={toggleSidebar}>
        导航
      </NavBar>
      <Drawer enableDragHandle sidebar={sidebar()} open={isOpenSidebar} onOpenChange={toggleSidebar}>
        <Route />
      </Drawer>
    </div>
  )
}

export default Home
