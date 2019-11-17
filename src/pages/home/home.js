import React, { lazy, useEffect, useState } from 'react'
import { Drawer, NavBar, Icon } from 'antd-mobile'
import { Switch, Route, Redirect, useHistory,useLocation } from 'react-router-dom'
import http from '@/http/http'
import { getLocalStorage, getSessionStorage, setSessionStorage } from '@/utils/storage'
import { useStoreState, useStoreActions } from 'easy-peasy'
import style from './home.less'
import classnames from 'classnames'
import ReactSVG from 'react-svg'

const About = lazy(() => import('@/pages/about/about'))
const User = lazy(() => import('@/pages/user/user'))
const Main = lazy(() => import('./main'))

function Home() {
  let history = useHistory()
  let location=useLocation()
  const isOpenSidebar = useStoreState(state => state.layout.isOpenSidebar)
  const role = useStoreState(state => state.user.userRole)
  const toggleSidebar = useStoreActions(actions => actions.layout.toggleSidebar)
  const [currentClickNav, setCurrentClickNav] = useState({})
  console.log('TCL: Home -> currentClickNav', currentClickNav)

  const baseNavList = [
    { text: '销售数据', roles: ['user', 'admin'], icon: 'saleTab', path: '/sale/fdd' },
    { text: '设备管理', roles: ['user', 'admin'], icon: 'machine', path: '/machine' },
    {
      text: '商品管理', roles: ['user', 'admin'], icon: 'shop',key:'shop',
      children: [
        { text: '地方', roles: ['user','admin'], icon: 'order', path: '/abc' },
        { text: '哈佛', roles: ['admin'], icon: 'account', path: '/bbc' }
      ]
    },
    { text: '订单管理', roles: ['admin'], icon: 'order', path: '/order' },
    { text: '账目管理', roles: ['admin'], icon: 'account', path: '/account' },
    {
      text: '会员管理',
      roles: ['user','admin'],
      icon: 'member',
      key:'member',
      children: [
        { text: '礼物', roles: ['admin'], icon: 'order', path: '/gift' },
        { text: '打折', roles: ['user','admin'], icon: 'account',key:'subAccount',  children: [
          { text: '家里的', roles: ['user','admin'], icon: 'order', path: '/tttt' },
          { text: '电风扇', roles: ['admin'], icon: 'account', path: '/ggg',key:'subsub',children:[
            { text: '大幅度', roles: ['admin'], icon: 'order', path: '/445' },

          ] }
        ]}
      ]
    }
  ]
  
  // 过滤路由权限
  const cloneData=JSON.parse(JSON.stringify(baseNavList))
  function filterData(data){
    for (let index = 0; index < data.length; index++) {
      const ele = data[index]
      if(!ele.roles.includes(role)){
        data.splice(index,1)
        index--
      }else if(ele.children){
        filterData(ele.children)
      }
     
    }
  }
  filterData(cloneData)
  const navList = cloneData

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
              <ReactSVG className="inlineSVG" src={require(`@/assets/${item.icon}.svg`)} />
              <span className="text">{item.text}</span>
              {item.children && <ReactSVG  className={classnames({inlineSVG:true,
                'icon-open':currentClickNav[item.key]
              })} src={require('@/assets/right.svg')} />}
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
        {listEle(navList)}
      </ul>
    )
  }

  function NotFound() {
    return <div className={style.notfound}>来到没有页面的沙漠地带</div>
  }

  return (
    <div className={style.home}>
      <NavBar icon={<Icon type="ellipsis" />} onLeftClick={toggleSidebar}>
        导航
      </NavBar>
      <Drawer enableDragHandle sidebar={sidebar()} open={isOpenSidebar} onOpenChange={toggleSidebar}>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route exact path="/home">
            <Main />
          </Route>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Drawer>
    </div>
  )
}

export default Home
