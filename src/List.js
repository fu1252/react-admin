import React,{useEffect} from 'react'

function List({data}){
  useEffect(() => {
    console.log('加载List组件');
      return () => {
        console.log('卸载List组件');
      };
  }, [])
  return(
    <ul>
    {data.map(item=>(
      <li key={item.a}>{item.a}</li>
    ))}
  </ul>
  )
}

export default List