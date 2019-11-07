const config={
  development:{
    api:'http://test-api-mall.vm-shopping.com/v2/',
  },
  production:{
    api: 'https://api.saiyaoyun.com/v2/',
  }
}

const mode = process.env.REACT_APP_CURRENT_ENV || 'development';
const result={...config[mode]}


export default result