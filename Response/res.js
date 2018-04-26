'use strict';
import {
    loginCode,
    registerCode,
    getInfoCode,
    singoutCode
} from './code'
class response {
    AdminLogin(code, data) {
        return {
            status: 0,
            message: loginCode[code],
            code: code,
            data: data
        }
    }
    AdminRegister(code) {
        return {
            status: 0,
            message: registerCode[code],
            code: code,
        }
    }
    AdminGetInfo(code, data) {
        return {
            status: 0,
            message: getInfoCode[code],
            code: code,
            data: data
        }
    }
    AdminSingout(code){
        return {
            status: 0,
            message: singoutCode[code],
            code: code,
        }
    }
}
export default new response();