'use strict'
let loginCode = {
    200: "用户存在,登录成功",
    201: "参数错误",
    202: "用户不存在",
    203: "密码错误"
}

let registerCode = {
    200: "注册成功",
    201: "参数错误",
    202: "用户已经注册过",
    203: "服务器繁忙，暂时无法注册"
}

module.exports = {
    loginCode,
    registerCode
}