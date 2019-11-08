export function getUserData(){
  const data=localStorage.getItem('userData')
  if(data){
    return JSON.parse(data)
  }else{
    return null
  }
}

