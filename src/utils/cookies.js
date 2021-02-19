import cookies from 'react-cookies'

const token = 'adminToken'
const username = 'username'

export function setToken(value){
  cookies.save(token, value)
}
export function setUsername(value){
  cookies.save(username, value)
}
export function getToken(){
  return cookies.load(token)
}
export function getUsername(){
  return cookies.load(username)
}