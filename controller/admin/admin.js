'use strict';
import AdminModel from '../../models/admin/admin';
import crypto from 'crypto'
import formidable from 'formidable'
import dtime from 'time-formater'
import response from '../../Response/res'
import common from '../common/common'
class Admin extends common {
    constructor() {
        super();
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.encryption = this.encryption.bind(this);
    }
    // 管理员登录
    async login(req, res, next) {
        console.log(req.body);
        let user_name = req.body.user_name;
        let password = req.body.password;
        let admin = await AdminModel.findOne({
            user_name: user_name
        }, null, {
            sort: {
                create_time: -1
            }
        }, (error, docs) => {
            return docs;
        })
        try {
            // 参数错误
            if (!user_name || !password) {
                res.send(response.AdminLogin(201))
            }
            // 参数无误
            else {
                // 管理员名不存在        
                if (!admin) {
                    res.send(response.AdminLogin(202));
                }
                // 管理员名存在        
                else {
                    // 密码正确
                    if (admin.password === this.encryption(password)) {
                        // 设置session
                        req.session.user_id = admin.user_id;
                        res.send(response.AdminLogin(200));
                    }
                    // 密码错误
                    else {
                        res.send(response.AdminLogin(203));
                    }
                }
            }
        } catch (error) {
            throw new Error(error.message)
        }

    }
    // 管理员注册
    async register(req, res, next) {
        let user_name = req.body.user_name;
        let password = req.body.password;
        try {
            // 参数错误
            if (!user_name || !password) {
                res.send(response.AdminRegister(201))
            }
            // 参数无误
            else {
                let admin = await AdminModel.findOne({
                    user_name: user_name
                }, null, (error, docs) => {
                    return docs
                })
                // 管理员已经注册
                if (admin) {
                    res.send(response.AdminRegister(202));
                }
                // 管理员没有注册
                else {
                    let newpassword = this.encryption(password);
                    let user_id = await this.getId("user_id");
                    const newAdmin = {
                        user_name: user_name,
                        password: newpassword,
                        user_id: user_id,
                        create_time: dtime().format('YYYY-MM-DD HH:mm'),
                        status: 1,
                        avatar: "default.jpg",
                        admin: "管理员",
                    }
                    await AdminModel.create(newAdmin, (error, docs) => {
                        // 注册失败
                        if (error) {
                            res.send(response.AdminRegister(203))
                        }
                        // 注册成功
                        else {
                            // 设置session
                            req.session.user_id = user_id;
                            res.send(response.AdminRegister(200))
                        }
                    });
                }
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }
    // 获取管理员的信息（回话中）
    async getInfo(req, res, next) {
        let user_id = req.session.user_id
        //   session有用户数据
        if (user_id) {
            let admin = await AdminModel.findOne({
                user_id: user_id
            }, "-_id -password -__v")
            res.send(response.AdminGetInfo(200, admin))
        }
        //   session没有用户数据
        else {
            res.send(response.AdminGetInfo(201))
        }
    }
    // 管理员登出
    async singout(req, res, next) {
        let user_id = req.session.user_id;
        //   session有用户数据
        if (user_id) {
            req.session.destroy();
            res.send(response.AdminSingout(200))
        }
        //   session没有用户数据
        else {
            res.send(response.AdminSingout(200))
        }
    }
    encryption(password) {
        const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
        return newpassword
    }
    Md5(password) {
        const md5 = crypto.createHash('md5');
        return md5.update(password).digest('base64');
    }
}
export default new Admin();