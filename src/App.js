import React, { useEffect, useState } from 'react'
import { Button, Input, Checkbox } from 'antd'
import useForm from 'react-hook-form'
import List from './List'
import styles from './App.less'

function App() {
  const { register, handleSubmit, setValue, reset } = useForm()

  console.log('母组件加载')

  const data = [
    { a: 11111, b: 'filter' },
    { a: 22222 },
    { a: 33333 },
    { a: 44444 },
  ]

  const [showList, setshowList] = useState(true)
  const [filterData, setFilterData] = useState(data)

  const onSubmit = (data, e) => {
    console.log('TCL: onSubmit -> data', data)
    if(data.toggle){
      e.target.reset()
    }
  }

  return (
    <div className={styles.app}>
      <Input type="text" />
      <Checkbox>选择</Checkbox>
      {showList && <List data={filterData} />}

      <Button type='primary' onClick={() => setshowList(!showList)}>Button</Button>
      <Button type='primary' >提交</Button>

      {/* 自定义 */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name='input' ref={register} className='custom-input' type="text" />

        <div>
          <input ref={register} className='custom-radio' type="radio" id="radio1"
            name="contact" value="email" />
          <label htmlFor="radio1">Email</label>

          <input ref={register} className='custom-radio' type="radio" id="contactChoice2"
            name="contact" value="phone" />
          <label htmlFor="contactChoice2">Phone</label>

          <input ref={register} className='custom-radio' type="radio" id="contactChoice3"
            name="contact" value="mail" />
          <label htmlFor="contactChoice3">Mail</label>
        </div>

        <input ref={register} className='custom-checkbox' type="checkbox" name="checkbox" id="checkbox" />
        <label htmlFor="checkbox">选择</label>

        <input ref={register} className='custom-toggle' type="checkbox" name="toggle" id="toggle" />
        <label htmlFor="toggle">选择</label>

        <button className='custom-btn' type='submit'>提交</button>
      </form>
    </div>
  )
}

export default App
