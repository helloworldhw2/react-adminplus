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
export function Status(data){
  return service.request({
    url: "/department/status/",
    method: "post",
    data
  })
}
export function Detailed(data){
  return service.request({
    url: "/department/detailed/",
    method: "post",
    data
  })
}
export function EditDepartment(data){
  return service.request({
    url: "/department/edit/",
    method: "post",
    data
  })
}