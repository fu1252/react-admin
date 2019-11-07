export function getUserData(){
  const token=localStorage.getItem('userData')
  if(token){
    return JSON.parse(token)
  }else{
    return null
  }
}

