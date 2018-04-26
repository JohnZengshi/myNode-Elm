'use strict'
let loginCode = {
    200: "管理员存在,登录成功",
    201: "参数错误",
    202: "管理员不存在",
    203: "密码错误"
}

let registerCode = {
    200: "注册成功,并自动登录",
    201: "参数错误",
    202: "管理员已经注册过",
    203: "服务器繁忙，暂时无法注册"
}
let getInfoCode = {
    200: "从session中获取管理员信息成功",
    201: "从session中获取管理员信息失败，要重新登录"
}
let singoutCode = {
    200: "退出成功"
}
module.exports = {
    loginCode,
    registerCode,
    getInfoCode,
    singoutCode
}