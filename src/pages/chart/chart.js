import React,{useEffect} from 'react'
import {Chart,Axis,Geom,Tooltip,Legend} from 'bizgoblin'
import {useStoreActions} from 'easy-peasy'

function ChartTest (){

  const closeSidebar = useStoreActions(actions => actions.layout.closeSidebar);

  useEffect(() => {
    closeSidebar();
  }, []);


  const data = [
    { month: 'Jan', city: 'Tokyo', temperature: 7 },
    { month: 'Jan', city: 'London', temperature: 3.9 },
    { month: 'Feb', city: 'Tokyo', temperature: 6.9 },
    { month: 'Feb', city: 'London', temperature: 4.2 },
    { month: 'Mar', city: 'Tokyo', temperature: 9.5 },
    { month: 'Mar', city: 'London', temperature: 5.7 },
    { month: 'Apr', city: 'Tokyo', temperature: 14.5 },
    { month: 'Apr', city: 'London', temperature: 8.5 },
    { month: 'May', city: 'Tokyo', temperature: 18.4 },
    { month: 'May', city: 'London', temperature: 11.9 },
    { month: 'Jun', city: 'Tokyo', temperature: 21.5 },
    { month: 'Jun', city: 'London', temperature: 15.2 },
    { month: 'Jul', city: 'Tokyo', temperature: 25.2 },
    { month: 'Jul', city: 'London', temperature: 17 },
    { month: 'Aug', city: 'Tokyo', temperature: 26.5 },
    { month: 'Aug', city: 'London', temperature: 16.6 },
    { month: 'Sep', city: 'Tokyo', temperature: 23.3 },
    { month: 'Sep', city: 'London', temperature: 14.2 },
    { month: 'Oct', city: 'Tokyo', temperature: 18.3 },
    { month: 'Oct', city: 'London', temperature: 10.3 },
    { month: 'Nov', city: 'Tokyo', temperature: 13.9 },
    { month: 'Nov', city: 'London', temperature: 6.6 },
    { month: 'Dec', city: 'Tokyo', temperature: 9.6 },
    { month: 'Dec', city: 'London', temperature: 4.8,
    }];
  
  function marker(x, y, r, ctx) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = ctx.fillStyle;
    ctx.moveTo(x - r - 3, y);
    ctx.lineTo(x + r + 3, y);
    ctx.stroke();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.fill();
  }
  return(
    <div>
    <h2>图表</h2>
    <Chart width='100%' data={data}>
      <Axis dataKey='month' />
      <Axis dataKey='temperature' />
      <Tooltip showCrosshairs />
      <Legend marker={marker} />
      <Geom geom="line" position="month*temperature" color="city" />
        <Geom geom="point" position="month*temperature" color="city" style={{ lineWidth: 1, stroke: '#FFF' }} />
    </Chart>
    </div>
  )
}

export default ChartTest