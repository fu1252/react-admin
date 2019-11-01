import React,{useEffect,useState} from 'react';
import {Button,Input,Checkbox} from 'antd'
import useForm from 'react-hook-form'
import List from './List'
import styles from './App.less';

function App() {
  const {register,handleSubmit,setValue,reset}=useForm()

  console.log('母组件加载');
  
  const data=[
    {a:11111,b:'filter'},
    {a:22222},
    {a:33333},
    {a:44444},
  ]
  
  const [showList, setshowList] = useState(true)
  const [filterData, setFilterData] = useState(data)
  const [checkValue, setCheckValue] = useState(true)
  const [inputValue, setInputValue] = useState('请输入')

  useEffect(() => {
    console.log(1111);
    if(checkValue===false){
      console.log(2222);
      const temp=filterData.filter(item=>item.b==='filter')
      setFilterData(temp)
    }else{
      setFilterData(data)
    }
  }, [checkValue])

  useEffect(() => {
    register({name:'input',required: true})
    register({name:'check',required: true})
  }, [register])

  const onSubmit = (data,e)=>{
    console.log('data',data);
    setCheckValue(data.check )
    reset({
      'input':'',
      check:true
    })
  }

  return (
    <div className={styles.app}>
       <Input name='input' defaultValue='啊啊啊'  className='input'  onChange={(e)=>setValue('input',e.target.value)} type="text"/>
       <Checkbox name='check' defaultChecked={true} onChange={(e)=>setValue('check',e.target.checked)}>选择</Checkbox>
       {showList&&<List data={filterData}/>}
       <Button type='primary' onClick={()=>setshowList(!showList)}>Button</Button>
       <Button type='primary' onClick={handleSubmit(onSubmit)}>提交</Button>
    </div>
  );
}

export default App;
