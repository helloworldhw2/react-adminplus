import service from '../utils/request';

export function AddDepartment(data){
  return service.request({
    url: "/department/add/",
    method: "post",
    data
  })
}