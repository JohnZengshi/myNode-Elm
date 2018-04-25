'use strict';
import {
    loginCode,
    registerCode
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
}
export default new response();