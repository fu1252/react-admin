
export function getLocalStorage(key){
  const dataTemp=localStorage.getItem(key)
  const data=JSON.parse(dataTemp)
  if(dataTemp){
    return data
  }else{
    return null
  }
}

export function isLogin(){
  const haveValue=getLocalStorage('userData')
  if(haveValue){
    return true
  }else{
    return false
  }
}

export function setLocalStorage(key,value){
  const data=JSON.stringify(value)
  return localStorage.setItem(key,data)
}

export function getSessionStorage(key){
  const dataTemp=sessionStorage.getItem(key)
  const data=JSON.parse(dataTemp)
  if(dataTemp){
    return data
  }else{
    return null
  }
}

export function setSessionStorage(key,value){
  const data=JSON.stringify(value)
  return sessionStorage.setItem(key,data)
}