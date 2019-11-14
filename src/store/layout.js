import {action} from 'easy-peasy'

const layout={
  isOpenSidebar:false,
  closeSidebar:action(state=>state.isOpenSidebar=false),
  toggleSidebar:action(state=>state.isOpenSidebar=!state.isOpenSidebar),
}

export default layout