import service from '../utils/request';

export function AddDepartment(data){
  return service.request({
    url: "/department/add/",
    method: "post",
    data
  })
}
export function GetList(data){
  return service.request({
    url: "/department/list/",
    method: "post",
    data
  })
}
export function Delete(data){
  return service.request({
    url: "/department/delete/",
    method: "post",
    data
  })
}