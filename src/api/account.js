import service from '../utils/request';

export function Login(data){
  return service.request({
    url: "/login/",
    method: "get",
    data
    // params: data //get request
  })
}

export function Code(data){
  return service.request({
    url: "/getSms/",
    method: "post",
    data
  })
}