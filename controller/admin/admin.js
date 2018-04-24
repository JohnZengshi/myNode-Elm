'use strict';
import AdminModel from '../../models/admin/admin';
import crypto from 'crypto'
import formidable from 'formidable'
import dtime from 'time-formater'
class Admin {
    constructor() {
        this.login = this.login.bind(this)
    }
    async login(req, res, next) {
        console.log(req.body)
        res.send({
            status: 0,
            message: "用户登录",
        });
    }
}
export default new Admin();