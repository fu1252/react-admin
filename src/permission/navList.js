const role = 'admin'

const baseNavList = [
  { text: '图表展示', roles: ['user', 'admin'], icon: 'saleTab', path: '/chart' },
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

export default navList