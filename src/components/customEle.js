import React from 'react'

function customEle() {

  return (
    <>
      <input className='custom-input' type="text" />

      <div>
        <input className='custom-radio' type="radio" id="radio1"
          name="contact" value="email" />
        <label htmlFor="radio1">Email</label>

        <input className='custom-radio' type="radio" id="contactChoice2"
          name="contact" value="phone" />
        <label htmlFor="contactChoice2">Phone</label>

        <input className='custom-radio' type="radio" id="contactChoice3"
          name="contact" value="mail" />
        <label htmlFor="contactChoice3">Mail</label>
      </div>

      <input className='custom-checkbox' type="checkbox" name="check" id="check" />
      <label htmlFor="check">选择</label>

      <input className='custom-toggle' type="checkbox" name="check" id="check" />
      <label htmlFor="check">选择</label>

      <button className='custom-btn'>提交</button>
    </>
  )
}

export default customEle