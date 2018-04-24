import express from 'express';
// mongodb配置文件
import db from './mongodb/db.js';
// 不同环境下的配置文件
import config from 'config-lite';
// api路由
import router from './routes/index.js';
// 设置，获取和删除 cookie
import cookieParser from 'cookie-parser';
// 服务端保存数据session
import session from 'express-session';
// 用于将session持久化到mongodb数据库
import connectMongo from 'connect-mongo';
// 日志工具
import winston from 'winston';
import expressWinston from 'express-winston';
// path模块
import path from 'path';
import history from 'connect-history-api-fallback';
// 命令窗输出字体颜色变化
import chalk from 'chalk';
// 获取post参数
import bodyParser from 'body-Parser'

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); //可以带cookies
    res.header("X-Powered-By", '3.2.1');
    if (req.method == "OPTIONS") {
        res.send(200);
    } else {
        next();
    }
})

// 持久化保存session到MongoDB
const MongoStore = connectMongo(session);
app.use(session({
    name: config.session.name,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: config.session.cookie,
    store: new MongoStore({
        url: config.url,
        ttl: 14 * 24 * 60 * 60
    })
}));

router(app);
app.use(history());
// 部署静态文件
app.use(express.static("./public"));
app.listen(config.port)