export const validate_password = /^(?![0-9]+$)(?![a-zA-z]+$)[0-9A-Za-z]{6,20}$/
const reg_email = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
// const reg_email = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

export function validate_email(value){
  return reg_email.test(value)
}

export function validate_passwords(value){
  return validate_password.test(value)
}